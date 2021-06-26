exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const member = message.mentions.members.first() ? message.mentions.members.first() : message.member

        client.money.ensure(`${member.id}`, {
            member: member.id,
            money: 0
        })

        const money = client.money.get(member.id, 'money')

        if (member.id === message.author.id) {
            message.channel.send(`${lang.YouCurrentlyHave} $${money}.`)
        } else {
            message.channel.send(`${member.user.tag} ${lang.CurrentlyHas} $${money}.`)
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['bal', 'balance', '$', 'wallet'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'money',
    category: 'Economy',
    description: 'Shows either yours or a mentioned user\'s money.',
    usage: 'money [@name]'
}