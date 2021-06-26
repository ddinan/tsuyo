const Discord = require('discord.js')
const request = require('request')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        request('https://uselessfacts.jsph.pl//random.json?language=en', function(error, body) {
            var result = JSON.parse(body.body)

            message.channel.send(result.text)
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['funfact', 'ff', 'rf', 'fact'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'randomfact',
    category: 'Fun',
    description: 'Shows a random fact.',
    usage: 'fact'
}