const Discord = require('discord.js')
const colors = require('../lib/colors.json')

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
            message.guild.members.ban(user).then(() => {
                message.reply('Successfully banned the user!')

                const modLogChannel = settings.modLogChannel
                if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User Banned')
                        .setColor(colors.default)
                        .setDescription(`Name: ${user.username}\nID: ${args[0]}\nReason: ${args.slice(1).join(' ')}\nModerator: ${message.author.username}`)

                    message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed)
                }
            }).catch(err => {
                message.reply('I was unable to ban the user.')
            })
        } else message.channel.send("You didn't provide a valid UserID!")
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['fb'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'forceban',
    category: 'Moderation',
    description: 'Bans a member not in your server.',
    usage: 'forceban <userID> [reason]'
}