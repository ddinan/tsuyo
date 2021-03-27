const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    try {
        const user = args[0]
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
            message.guild.members.unban(args[0]).then(() => {
                message.reply(`Successfully unbanned ${user}`)
            }).catch(err => {
                message.reply('I was unable to unban the member.')
                message.channel.send(client.errors.genericError + err.stack).catch();
            })
        } else {
            message.reply('You didn\'t give the User ID to unban!')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['ub'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'unban',
    category: 'Moderation',
    description: 'Unbans a member for an optional reason.',
    usage: 'unban <userid> [reason]'
}