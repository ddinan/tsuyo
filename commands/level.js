exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const friendly = client.config.permLevels.find(l => l.level === level).name
        message.channel.send(`${lang.YourPermissionLevel} ${level} (${friendly}).`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['perms'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'level',
    category: 'Utility',
    description: 'Shows your permission level.',
    usage: 'level'
}