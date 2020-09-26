const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  try {
    if (!args[0]) {
      let currentCategory = ''

      let output = `Type ${prefix}commands <category> to view all commands in that category`
      const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)

      sorted.forEach(async c => {
        const cat = c.help.category
        if (currentCategory !== cat) {
          output += `\n**${prefix}commands ${cat.toLowerCase()}**`
          currentCategory = cat
        }
      })

      const embed = new Discord.MessageEmbed()
	  .setTitle('Commands')
	  .setColor(colors.default)
	  .addField(`Type ${prefix}commands <category> to view all commands in that category`, 'Valid categories:\n`admin`, `economy`, `fun`, `moderation`, `utility`')

      message.channel.send(embed)
    } else {
      let command = args[0]
      if (client.commands.has(command) || client.aliases.has(command)) {
        command = client.commands.get(command) || client.aliases.get(command)

        const embedTiny = new Discord.MessageEmbed()
	      .setTitle(`Help - ${prefix}${command.help.name}`)
	      .setColor(colors.default)
          .setThumbnail(client.user.avatarURL)
          .setDescription(`${command.help.description}\n\n**Usage:** ${command.help.usage}\n**Aliases:** ${command.conf.aliases.join(' | ') || 'none'}`)
	      .addField('Permission level', `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
          .addField('Category', command.help.category, true)
          .addField('Guild only', command.conf.guildOnly ? 'Yes' : 'No', true)

        message.channel.send(embedTiny)
      } else {
        const currentCategory = ''
        let output = ''

        const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
        sorted.forEach(c => {
          const cat = c.help.category.toLowerCase()
          if (cat == args[0].toLowerCase()) {
            if (level < client.levelCache[c.conf.permLevel]) return
            output += '`' + c.help.name + '` '
          }
        })

        if (!output) return message.reply('That\'s not a valid category!')
		 const embed = new Discord.MessageEmbed()
	      .setTitle('Commands')
	      .setColor(colors.default)
          .setThumbnail(client.user.avatarURL)
          .setDescription(output)

        message.channel.send(embed)
      }
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err.stack).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['cmds', 'c'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'commands',
  category: 'Utility',
  description: 'Displays a list of all commands under <category>.',
  usage: 'commands <category>'
}
