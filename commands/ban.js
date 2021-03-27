const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    try {
        const user = message.mentions.users.first()
        const settings = client.getSettings(message.guild.id)
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());

        // Ensure mod/admin roles actually exist
        if (!modRole) {
            return message.channel.send("There is no moderator role. Please set one using `;;config edit modRole [your role name]`.")
        }

        if (!adminRole) {
            return message.channel.send("There is no administrator role. Please set one using `;;config edit adminRole [your role name]`.")
        }

        if (!message.member.roles.cache.has(modRole.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You can't use this command!")
        }

        if (user) {
            const member = message.guild.member(user)
            if (member) {
                member.ban(args.slice(1).join(' ')).then(() => {
                    message.reply(`Successfully banned ${user.tag}!`)
                }).catch(err => {
                    message.reply('I was unable to ban the user!')
                })
            } else {
                message.reply('That user isn\'t in this guild!')
            }
        } else {
            message.reply('You didn\'t mention the user to ban!')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['b', 'forceban'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans the specified user.',
    usage: 'ban @<user> [reason]'
}