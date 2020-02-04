const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const fs = require('fs');
const cooled = new Discord.Collection()

module.exports = async (client, message) => {
  if (message.author.bot) return
  if (client.config.blacklisted.includes(message.author.id)) return
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if (message.content.match(prefixMention)) {
    const embed = new Discord.RichEmbed()
      .setTitle('Help')
      .setColor(colors.default)
      .setThumbnail('https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
      .addField('Commands', `Commands can be found by typing \`${prefix}commands\`.`)
      .addField('Want to invite me to your Discord?', '[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)')
      .addField('Need more assistance?', '[Click here to join the official Tsuyo support server](https://discord.gg/3hbeQgY)')
    
      if (message.guild !== null) {
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return
        return message.channel.send(embed)
      }
    
      return message.channel.send(embed)
  }
  
  const pingWords = require('../modules/pingWords.js')
  pingWords(client, message)
  
  const censorship = require('../modules/censorship.js')
  censorship(client, message)
  
  // Commands
  
  if (!message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  let level = client.permlevel(message)
  const cmd = client.commands.get(command) || client.aliases.get(command)
  if (!client.commands.has(command) && !client.aliases.has(command)) return
  
  if (!cmd.conf.enabled) return message.reply('This command is not enabled!')
  if (message.guild === null && cmd.conf.guildOnly) return message.reply('You need to be in a guild to use this command!')
  
  message.author.permLevel = level
  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (client.getSettings(message.guild.id).noPermissionNotice === 'true') {
      return message.channel.send(`You don't have permission to use this command!
		Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
		This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})!`)
    } else return
  }

  message.flags = []
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1))
  }
  
  
  if (message.channel.type !== "dm") {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return
    
    if (client.tags.has(message.guild.id)) {
      Object.keys(client.tags.get(message.guild.id)).forEach(tagid => {
        const tag = client.tags.get(message.guild.id)[tagid]

        if (message.content.toLowerCase() == tag.name.toLowerCase()) message.channel.send(tag.text.replace('@user', '<@' + message.author.id + '>'))
      })
    }
    
    if (client.getSettings(message.guild.id).pointsEnabled === 'true') {
      const key = `${message.guild.id}-${message.author.id}`

      client.points.ensure(`${message.guild.id}-${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      })

        client.points.inc(key, 'points')

        const curLevel = Math.floor(0.5 * Math.sqrt(client.points.get(key, 'points')))

        if (client.points.get(key, 'level') < curLevel) {
          message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`)
          client.points.set(key, curLevel, 'level')
        }
      }

      if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return

    if (cooled.get(message.author.id)) return message.react('⏳')
    if (client.permlevel(message) < 6) {
      cooled.set(message.author.id, true)
      setTimeout(async () => {
        cooled.delete(message.author.id)
      }, 3000)
    }
  }

  try {
    cmd.run(client, message, args, level)

    client.uses.ensure(cmd.help.name, 1)
    client.uses.inc(cmd.help.name)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}