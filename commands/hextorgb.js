exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (!args[0]) return message.channel.send(lang.NoArgumentSpecified)

        function hexToRGB(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        const hex = args[0]

        if (hexToRGB(hex) == null) return message.channel.send(lang.InvalidArgument)

        const r = hexToRGB(hex).r
        const g = hexToRGB(hex).g
        const b = hexToRGB(hex).b

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