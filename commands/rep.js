exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const user = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!user) return message.channel.send(lang.NoUserSpecified)
        if (user.bot === true) return message.channel.send(lang.BotsRep)

        if (user === message.author || message.author.id === user.id) return message.channel.send(lang.GiveSelfRep)

        client.cooldown.ensure(`${message.author.id}`, {
            member: message.author.id,
            dailybonus: 0,
            rep: 0,
            plants: 0
        })

        const cooldown = client.cooldown.get(message.author.id, 'rep')

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (cooldown === date) return message.channel.send(lang.RepCooldown)

        // Ensure this user has gotten rep before
        client.reputation.ensure(`${user.id}`, {
            user: user.id,
            rep: 0
        })

        const rep = client.reputation.get(`${user.id}`, 'reputation')

        client.reputation.set(`${user.id}`, rep + 1, 'reputation')
        message.channel.send(`${lang.YouGave} ${user.tag} +1 ${lang.Reputation}.`)
        client.cooldown.set(`${message.author.id}`, date, 'rep') // Activate 24 hour cooldown
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['+rep', 'giverep', 'repgive', 'rep'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'reputation',
    category: 'Economy',
    description: 'Gives +1 reputation to <member>.',
    usage: 'reputation <member>'
}