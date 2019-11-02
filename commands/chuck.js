const Discord = require('discord.js')
const request = require('request')

exports.run = async (client, message, args, level) => {
  request('https://api.chucknorris.io/jokes/random', function (error, body) {
    var result = JSON.parse(body.body)

    message.channel.send(result.value)
  })
}

exports.conf = {
  enabled: true,
  aliases: ['chucknorris', 'cn', 'norris'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'chuck',
  category: 'Fun',
  description: 'Chuck Norris does not need a description, the description needs Chuck Norris.',
  usage: 'chuck'
}
