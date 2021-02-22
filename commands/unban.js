const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    try {
        const user = args[0]
        const settings = client.getSettings(message.guild.id)
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());
        if (!message.member.roles.cache.has(modRole.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You can't use this command!")
        }

        if (user) {
            message.guild.unban(args.slice(1).join(' ')).then(() => {
                message.reply(`Successfully unbanned ${user.tag}`)

                const modLogChannel = settings.modLogChannel
                if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User Unban')
                        .setColor(colors.green)
                        .setDescription(`Reason: ${args.slice(1).join(' ')}\nModerator: ${message.author.username}`)

                    message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed)
                }
            }).catch(err => {
                message.reply('I was unable to unban the member')
            })
        } else {
            message.reply('You didn\'t give the UserID to unban!')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['b'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'unban',
    category: 'Moderation',
    description: 'Unbans a member for an optional reason.',
    usage: 'unban <userid> [reason]'
}