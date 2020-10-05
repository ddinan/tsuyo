const Discord = require('discord.js')
const request = require('request')

exports.run = async (client, message, args, level) => {
  try {
    request('https://api.chucknorris.io/jokes/random', function (error, body) {
      var result = JSON.parse(body.body)

      message.channel.send(result.value)
    })
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();
  }
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
