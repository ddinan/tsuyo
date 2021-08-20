const {
    MessageEmbed
} = require('discord.js')

const joke = require('one-liner-joke').getRandomJoke
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")
    try {
        const embed = new MessageEmbed()
            .setColor(colors.default)
            .setDescription(joke({
                exclude_tags: ['dirty', 'racist', 'marriage', 'sex', 'death']
            }).body)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()
        message.channel.send({
            embeds: [embed]
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['randomjoke'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'joke',
    category: 'Fun',
    description: 'Returns a random joke.',
    usage: 'joke'
}