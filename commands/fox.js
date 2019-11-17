const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  request('https://randomfox.ca/floof/', function (error, body) {
    var result = JSON.parse(body.body)
    const embed = new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage(result.image)
      .setFooter('🦊',
        'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')

    message.channel.send(embed)
  })
}

exports.conf = {
  enabled: true,
  aliases: ['fox', 'kitsune'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'fox',
  category: 'Fun',
  description: 'Shows a random picture of a fox.',
  usage: 'fox'
}
