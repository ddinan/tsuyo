const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const user = args[0]
        const settings = client.getSettings(message.guild.id)
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());

        // Ensure mod/admin roles actually exist
        if (!modRole) {
            return message.channel.send(lang.NoModRole)
        }

        if (!adminRole) {
            return message.channel.send(lang.NoAdminRole)
        }

        if (!message.member.roles.cache.has(modRole.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(lang.NoPermission)
        }

        if (user) {
            message.guild.members.unban(args[0]).then(() => {
                message.reply(`${lang.SuccessfullyUnbanned} ${user}`)
            }).catch(err => {
                message.reply(lang.UnableToUnban)
                const errors = require('../modules/errors.js')
                errors.embedError(err, lang, message)
            })
        } else {
            message.reply(lang.NoUserSpecified)
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['ub', 'uban'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'unban',
    category: 'Moderation',
    description: 'Unbans a member for an optional reason.',
    usage: 'unban <userid> [reason]'
}