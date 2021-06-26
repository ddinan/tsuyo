exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const user = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!user) return message.channel.send(lang.NoUserSpecified)
        if (user.bot === true) return message.channel.send(lang.BotsMoney)
        if (!args[1]) return message.channel.send(lang.NoAmountSpecified)
        if (isNaN(args[1])) return message.channel.send(lang.InvalidAmount)

        client.money.ensure(`${user.id}`, {
            user: user.id,
            money: 0
        })

        const money = client.money.get(`${user.id}`, 'money')
        client.money.set(`${user.id}`, parseInt(args[1]), 'money')
        message.channel.send(`${lang.YouGave} **${user.tag}** \`${args[1]}\`\n**${user.tag}${lang.UsersBalance}** $${parseInt(args[1])}`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['sm'],
    guildOnly: true,
    permLevel: 'Bot Moderator'
}

exports.help = {
    name: 'setmoney',
    category: 'Developer',
    description: 'Pays <money> to <member>.',
    usage: 'setmoney <member> <money>'
}