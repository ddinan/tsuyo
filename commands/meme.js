const {
    MessageEmbed
} = require('discord.js')

const randomPuppy = require('random-puppy')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const subReddits = ['dankmeme', 'meme', 'memes', 'spicy_memes', 'me_irl']
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        const embed = new MessageEmbed()
            .setColor(colors.default)
            .setImage(img)
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
    aliases: [],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'meme',
    category: 'Fun',
    description: 'Searches for the dankest of memes in the dankest of subreddits.',
    usage: 'meme'
}