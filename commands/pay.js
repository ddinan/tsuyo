exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const user = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!user) return message.channel.send(lang.NoUserSpecified)
        if (user.bot === true) return message.channel.send(lang.BotsMoney)
        if (!args[1]) return message.channel.send(lang.NoAmountSpecified)
        if (message.mentions.users.first() === message.author) return message.channel.send(lang.GiveSelfMoney)
        if (isNaN(args[1]) || args[1] <= 0) return message.channel.send(lang.InvalidAmount)

        client.money.ensure(`${message.author.id}`, {
            user: message.author.id,
            money: 0
        })

        const yourMoney = client.money.get(`${message.author.id}`, 'money')
        if (yourMoney < args[1]) return message.channel.send(lang.NotEnoughMoney)

        client.money.ensure(`${user.id}`, {
            user: user.id,
            money: 0
        })

        const money = client.money.get(`${user.id}`, 'money')
        client.money.set(`${user.id}`, parseInt(money) + parseInt(args[1]), 'money')

        client.money.set(`${message.author.id}`, parseInt(yourMoney) - parseInt(args[1]), 'money')
        message.channel.send(`${lang.YouGave} **${user.tag}** \`${parseInt(args[1])}\`\n**${user.tag}${lang.UsersBalance}:** $${parseInt(money) + parseInt(args[1])}\n**${lang.YourBalance}:** $${parseInt(yourMoney) - parseInt(args[1])}`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['give', 'givemoney', 'paymoney', 'g', 'pm'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'pay',
    category: 'Economy',
    description: 'Pays <money> to <member>.',
    usage: 'pay <member> <money>'
}