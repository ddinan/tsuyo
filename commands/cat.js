const {
    MessageEmbed
} = require('discord.js')

const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        request('http://aws.random.cat/meow', function(error, body) {
            var result = JSON.parse(body.body)
            const embed = new MessageEmbed()
                .setColor(colors.default)
                .setImage(result.file)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['kitty', 'kitten', 'kit', 'neko'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'cat',
    category: 'Fun',
    description: 'Shows a random picture of a cat.',
    usage: 'cat'
}