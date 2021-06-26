exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());

        // Ensure admin role actually exists

        if (!adminRole) {
            return message.channel.send(lang.NoAdminRole)
        }

        if (!message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(lang.NoPermission)
        }
        if (!args[1]) return message.reply(lang.NoArgumentSpecified)
        if (!args[0]) return message.reply(lang.NoArgumentSpecified)

        message.channel.send(lang.ChannnelCreated).then(() => {
            message.guild.createChannel(args[1], args[0], [])
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['crc', 'chanmake'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'createchannel',
    category: 'Moderation',
    description: 'Creates a channel in the server.',
    usage: 'createchannel <voice/text> <name>'
}