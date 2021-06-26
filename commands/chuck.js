const Discord = require('discord.js')
const request = require('request')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        request('https://api.chucknorris.io/jokes/random', function(error, body) {
            var result = JSON.parse(body.body)

            message.channel.send(result.value)
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
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