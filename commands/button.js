const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

const {
    pagination
} = require('reconlx')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        let embed1 = new MessageEmbed().setTitle('one')
        let embed2 = new MessageEmbed().setTitle('two')
        let embed3 = new MessageEmbed().setTitle('three')
        let embed4 = new MessageEmbed().setTitle('four')
        let embed5 = new MessageEmbed().setTitle('five')
        let embed6 = new MessageEmbed().setTitle('six')
        let embed7 = new MessageEmbed().setTitle('seven')
        let embed8 = new MessageEmbed().setTitle('eight')
        let embed9 = new MessageEmbed().setTitle('nine')
        let embed10 = new MessageEmbed().setTitle('ten')

        let embeds = [
            embed1,
            embed2,
            embed3,
            embed4,
            embed5,
            embed6,
            embed7,
            embed8,
            embed9,
            embed10
        ]

        pagination({
            embeds: embeds,
            channel: message.channel,
            author: message.author,
            fastSkip: true,
            pageTravel: true,
            max: 0
        })

    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: false,
    aliases: ['btn'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'button',
    category: 'Utility',
    description: 'Example button navigation menu.',
    usage: 'button'
}