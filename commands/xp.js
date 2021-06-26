exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (args[0] === 'give') {
            // Limited to guild owner
            if (message.author.id !== message.guild.ownerID) {
                return message.reply(lang.NotOwner)
            }

            const user = message.mentions.users.first() || client.users.get(args[0])
            if (!user) return message.reply(lang.NoUserSpecified)

            const pointsToAdd = parseInt(args[2], 10)
            if (!pointsToAdd) return message.reply(lang.NoAmountSpecified)

            // Ensure there is a points entry for this user.
            client.points.ensure(`${message.guild.id}-${user.id}`, {
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 1
            })

            // Get their current points.
            let userPoints = client.points.get(`${message.guild.id}-${user.id}`, 'points')
            userPoints += pointsToAdd

            // And we save it!
            client.points.set(`${message.guild.id}-${user.id}`, userPoints, 'points')

            message.channel.send(`${user.tag} ${lang.HasReceived} ${pointsToAdd} ${lang.NowHas} ${userPoints} ${lang.Points}`)
            return
        }

        if (args[0] === 'take') {
            // Limited to guild owner
            if (message.author.id !== message.guild.ownerID) {
                return message.reply(lang.NotOwner)
            }

            const user = message.mentions.users.first() || client.users.get(args[0])
            if (!user) return message.reply(lang.NoUserSpecified)

            const pointsToTake = parseInt(args[2], 10)
            if (!pointsToTake) return message.reply(lang.NoArgumentSpecified)

            // Ensure there is a points entry for this user.
            client.points.ensure(`${message.guild.id}-${user.id}`, {
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 1
            })

            // Get their current points.
            let userPoints = client.points.get(`${message.guild.id}-${user.id}`, 'points')
            userPoints -= pointsToTake

            // And we save it!
            client.points.set(`${message.guild.id}-${user.id}`, userPoints, 'points')

            message.channel.send(`${user.tag} ${lang.HasLost} ${pointsToTake} ${lang.NowHas} ${userPoints} ${lang.Points}.`)
            return
        }

        const key = `${message.guild.id}-${message.author.id}`
        const xp = client.points.get(key, 'points')
        const level = client.points.get(key, 'level')
        const number = ((5 * (level + 1)) ** 2) - xp

        message.channel.send(`${lang.YouCurrentlyHave} ${xp}XP, ${lang.AndAreLevel} ${level}!`)
        message.channel.send(`${lang.YouNeed} ${number}XP ${lang.LevelUpTo} ${level + 1}`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'xp',
    category: 'Economy',
    description: 'Shows your XP/level for this Discord.',
    usage: 'xp'
}