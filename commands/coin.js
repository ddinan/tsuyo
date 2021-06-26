exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const sides = [lang.CoinHeads, lang.CoinTails]
        const side = sides[Math.floor(Math.random() * sides.length)]
        message.channel.send(`${lang.CoinLandedOn} ${side}.`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['flipcoin', 'fc'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'coin',
    category: 'Utility',
    description: 'Flips a coin.',
    usage: 'coin'
}