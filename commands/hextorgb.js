exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (!args[0]) return message.channel.send(lang.NoArgumentSpecified)

        const hex = args.join(' ').replace('#', '')
        const r = Number(hex.substring(0, 2))
        const g = parseInt(hex.substring(2, 4))
        const b = parseInt(hex.substring(4, 6))

        message.channel.send(`${lang.RGBCode} rgb(${r}, ${g}, ${b})`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['hex'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'hextorgb',
    category: 'Utility',
    description: 'Converts HEX to RGB',
    usage: 'hextorgb <value>'
}