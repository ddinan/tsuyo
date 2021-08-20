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

        if (args.length === 0) {
            return message.channel.send(lang.NoOptionSpecified)
        }

        if (args[0] === "add") {
            if (message.member.roles.cache.some(r => r.name === settings.modRole) || message.member.roles.cache.some(r => r.name === settings.adminRole)) {
                if (args.length === 1) return message.channel.send(lang.NoArgumentSpecified)

                const input = message.content.startsWith(`${settings.prefix}sg add`) ? message.content.split(`${settings.prefix}sg add `) : message.content.split(`${settings.prefix}suggestions add`)

                const embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor(colors.default)
                    .setDescription(input)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                const newMsg = await message.channel.send({
                    embeds: [embed]
                })

                const newEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor(colors.default)
                    .setDescription(input)
                    .setTimestamp()
                    .setFooter(`${lang.ID}: ${newMsg.id}`)

                newMsg.edit(newEmbed).then(() => {
                    message.delete()
                    newMsg.react(yesEmoji).then(() => {
                        newMsg.react(noEmoji)
                        return
                    })
                })
            } else {
                return message.channel.send(lang.NoPermission)
            }
        }

        if (args[0] === "delete" || args[0] === "del" || args[0] === "deny" || args[0] === "decline" || args[0] === "reject") {
            if (message.member.roles.cache.some(r => r.name === settings.adminRole)) {
                if (args.length === 1) return message.channel.send(lang.NoArgumentSpecified)

                if (settings.deniedChannel && message.channel.guild.channels.cache.find(c => c.name == settings.deniedChannel)) {
                    const deniedChannel = message.channel.guild.channels.cache.find(c => c.name == settings.deniedChannel)

                    message.channel.fetchMessage(args[1])
                        .then(suggestion => {
                            const embed = suggestion.embeds[0];
                            const newEmbed = new Discord.MessageEmbed(embed)
                                .setColor(colors.red)
                                .setTimestamp()
                                .setFooter(`${lang.ID}: ${args[1]}`)

                            deniedChannel.send(newEmbed)
                            suggestion.delete()
                            message.delete()
                            return
                        }).catch()
                }
            } else {
                return message.channel.send(lang.NoPermission)
            }
        }

        if (args[0] === "accept") {
            if (message.member.roles.cache.some(r => r.name === settings.adminRole)) {
                if (args.length === 1) return message.channel.send(lang.NoArgumentSpecified)

                if (settings.acceptedChannel && message.channel.guild.channels.cache.find(c => c.name == settings.acceptedChannel)) {
                    const acceptedChannel = message.channel.guild.channels.cache.find(c => c.name == settings.acceptedChannel)

                    message.channel.fetchMessage(args[1])
                        .then(suggestion => {
                            const embed = suggestion.embeds[0];
                            const newEmbed = new Discord.MessageEmbed(embed)
                                .setColor(colors.green)
                                .setTimestamp()
                                .setFooter(`${lang.ID}: ${args[1]}`)

                            acceptedChannel.send(newEmbed)
                            suggestion.delete()
                            message.delete()
                            return
                        }).catch()
                }
            } else {
                return message.channel.send(lang.NoPermission)
            }
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['sg', 'suggestion'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'suggestions',
    category: 'Moderation',
    description: 'Suggestions system.',
    usage: 'suggestions <add/accept/deny>'
}