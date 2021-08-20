const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const user = message.mentions.users.first()
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
            const member = message.guild.member(user)
            if (member) {
                if (!client.warns.cache.get(message.guild.id)) client.warns.set(message.guild.id, {})
                if (!client.warns.cache.get(message.guild.id)[member.id]) client.warns.cache.get(message.guild.id)[member.id] = 0

                client.warns.cache.get(message.guild.id)[member.id] += 1
                message.reply(`${lang.SuccessfullyWarned} ${user.tag}`)

                const modLogChannel = settings.modLogChannel
                if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
                    const embed = new MessageEmbed()
                        .setTitle(lang.UserWarned)
                        .setColor(colors.red)
                        .setDescription(`${lang.Name}: ${user.username}\n${lang.ID}: ${user.id}\n${lang.Moderator}: ${message.author.username}`)
                        .setTimestamp()

                    message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send({
                        embeds: [embed]
                    })
                }

                if (client.warns.cache.get(message.guild.id)[member.id] == 3) {
                    member.ban(args.slice(1).join(' ')).then(() => {
                        message.reply(`${lang.SuccessfullyWarned} ${user.tag}`)

                        client.warns.cache.get(message.guild.id)[member.id] = 0
                    }).catch(err => {
                        message.reply(lang.UnableToWarn)
                    })
                }
            } else {
                message.reply(lang.NotInGuild)
            }
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
    aliases: ['w'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'warn',
    category: 'Moderation',
    description: 'Warns a member for an optional reason.',
    usage: 'warn <user> [reason]'
}