exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        client.life.ensure(message.author.id, {
            member: message.author.id,
            spouse: 0,
            job: 0
        })

        const spouse = client.life.get(message.author.id, 'spouse')
        if (spouse === 0) return message.channel.send(lang.NeedSpouse)

        if (args[0] === 'confirm') {
            message.channel.send(lang.DivorcedPartner)
            client.life.set(message.author.id, 0, 'spouse')
            client.life.set(spouse, 0, 'spouse')
        } else {
            message.channel.send(lang.ConfirmDivorce)
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['div', 'fixyourlife'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'divorce',
    category: 'Fun',
    description: 'Divorces your spouse.',
    usage: 'divorce'
}