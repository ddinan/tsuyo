exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase())
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase())

        // Ensure mod/admin roles actually exist
        if (!modRole) {
            return message.channel.send(lang.NoModRole)
        }

        if (!adminRole) {
            return message.channel.send(lang.NoAdminRole)
        }

        if (!message.member.roles.cache.has(modRole.id) && !message.member.permissions.has("MANAGE_MESSAGES") && !message.member.roles.cache.has(adminRole.id) && !message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(lang.NoPermission)
        }

        if (args.length === 0) return message.channel.send(lang.NoArgumentSpecified)

        message.delete().catch()
        const msg = args.join(' ')
        message.channel.send(msg)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['s', 'msg'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'say',
    category: 'Moderation',
    description: 'Says <text> as the bot.',
    usage: 'say <text>'
}