const ms = require('ms')
exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

        client.cooldown.ensure(`${message.author.id}`, {
            member: message.author.id,
            dailybonus: 0,
            rep: 0,
            plants: 0
        })

        const cooldown = client.cooldown.get(message.author.id, 'dailybonus')

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (cooldown === date) return message.channel.send(lang.AlreadyClaimedBonus)

        client.cooldown.set(`${message.author.id}`, date, 'dailybonus') // Activate 24 hour cooldown

        client.money.ensure(`${message.author.id}`, {
            member: message.author.id,
            money: 0
        })

        const money = client.money.get(message.author.id, 'money')
        client.money.set(`${message.author.id}`, money + 100, 'money')
        message.channel.send(`${lang.ClaimedBonus} \`$${100}\`.`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['claim', 'bonus', 'dailybonus'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'daily',
    category: 'Economy',
    description: 'Claim your daily bonus every 24 hours.',
    usage: 'daily'
}