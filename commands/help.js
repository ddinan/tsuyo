const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

  try {
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
				.setTitle('Help')
				.setColor(colors.default)
				.setThumbnail(client.user.avatarURL)
				.addField('Commands', `Commands can be found by typing \`${prefix}commands\`.`)
				.addField('Want to invite me to your Discord?', '[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)')
				.addField('Need more assistance?', '[Click here to join the official Tsuyo support server](https://discord.gg/3hbeQgY)')
				.setImage("https://i.imgur.com/QlKiesl.png")

      message.channel.send(embed)
    } else {
      // Show individual command/alias/category's help
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
        const userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level)

        const sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
        sorted.forEach(c => {
          const cat = c.help.category.toLowerCase()
          if (cat == args[0].toLowerCase()) {
            if (level < client.levelCache[c.conf.permLevel]) return
            output += '`' + c.help.name + '` '
          }
        })

        if (!output) return message.reply('That\'s not a valid command.')
      }
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err.stack).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['h'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'help',
  category: 'Utility',
  description: 'Shows useful information.\nIf <command> is specified, will show description and usage of that command.',
  usage: 'help <command>'
}
