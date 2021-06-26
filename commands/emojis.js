exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        let notAnimated = []
        let animated = []

        message.guild.emojis.cache.forEach(async emoji => {
            if (emoji.animated) animated.push(emoji.toString())
            else notAnimated.push(emoji.toString())
        })

        if (!animated[0]) animated = ['None']
        if (!notAnimated[0]) notAnimated = ['None']

        message.channel.send(`${lang.Animated}:\n${animated.join(' ')}\n\n${lang.NotAnimated}: ${notAnimated.join(' ')}`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['emoji', 'emote', 'emotes+'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'emojis',
    category: 'Utility',
    description: 'Displays all of the server\'s emojis.',
    usage: 'emojis'
}