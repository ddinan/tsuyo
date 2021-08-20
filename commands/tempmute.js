const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')
const ms = require('ms')

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

        if (args[0] && ms(args[0])) {
            if (user) {
                const member = message.guild.member(user)
                if (member) {
                    member.roles.add(message.guild.roles.find(r => r.name == settings.muteRole)).then(async () => {
                        message.reply(`${lang.SuccessfullyTempMuted} ${user.tag}`)

                        const modLogChannel = settings.modLogChannel
                        if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
                            const embed = new MessageEmbed()
                                .setTitle(lang.UserTempMuted)
                                .setColor(colors.red)
                                .setDescription(`${lang.Name}: ${user.username}\n${lang.ID}: ${user.id}\n${lang.Moderator}: ${message.author.username}`)
                                .setTimestamp()

                            message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send({
                                embeds: [embed]
                            }).catch(console.error)
                        }

                        await setTimeout(async () => {
                            await member.removeRole(message.guild.roles.find(r => r.name == settings.muteRole))
                        }, ms(args[0]))
                    }).catch(err => {
                        message.reply(lang.UnableToMute)
                    })
                } else message.reply(lang.NotInGuild)
            } else message.reply(lang.NoUserSpecified)
        } else message.reply(lang.NoAmountSpecified)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['tm', 'tmute'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'tempmute',
    category: 'Moderation',
    description: 'Temporarily mutes a member.',
    usage: 'tempmute <time> @<user>'
}