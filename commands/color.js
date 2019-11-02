const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  try {
    const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6)

    const embed = new Discord.RichEmbed()
      .setColor(hex)
      .setDescription('Random HEX Code: #' + hex)
      .setTitle('#' + hex)

    message.channel.send(embed)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['randomcolor', 'randomcolour', 'colour', 'rcol'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'color',
  category: 'Utility',
  description: 'Returns a random color code.',
  usage: 'color'
}
