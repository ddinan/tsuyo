const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const yesEmoji = '✅'
        const noEmoji = message.client.emojis.cache.get('637573919204966410')
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
        const input = message.content.split(`${settings.prefix}poll `)

        const embed = new MessageEmbed()
            .setTitle(`🗳 ${lang.Poll}`)
            .setColor(colors.default)
            .addField(`${lang.ReactWith} ✅ ${lang.Or} ${noEmoji} ${lang.ToVote}`, input, true)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        if (args.length === 0) {
            message.channel.send(lang.NoArgumentSpecified)
        } else {
            message.delete()
            message.channel.send({
                embeds: [embed]
            }).then(message => {
                message.react(yesEmoji)
                    .then(() => message.react(noEmoji))
            })
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['ask'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'poll',
    category: 'Moderation',
    description: 'Starts a poll.',
    usage: 'poll <question>'
}