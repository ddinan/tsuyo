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
                if (!client.warns.cache.get(message.guild.id)) client.warns.set(message.guild.id, {})
                if (!client.warns.cache.get(message.guild.id)[member.id]) client.warns.cache.get(message.guild.id)[member.id] = 0

                client.warns.cache.get(message.guild.id)[member.id] += 1
                message.reply(`Successfully warned ${user.tag}`)

                const modLogChannel = settings.modLogChannel
                if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User Warn')
                        .setColor(colors.red)
                        .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`)

                    message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed)
                }

                if (client.warns.cache.get(message.guild.id)[member.id] == 3) {
                    member.ban(args.slice(1).join(' ')).then(() => {
                        message.reply(`Successfully banned ${user.tag}`)

                        client.warns.cache.get(message.guild.id)[member.id] = 0
                    }).catch(err => {
                        message.reply('I was unable to ban the member for exeding the max amount of warns')
                    })
                }
            } else {
                message.reply('That user isn\'t in this guild!')
            }
        } else {
            message.reply('You didn\'t mention the user to warn!')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'warn',
    category: 'Moderation',
    description: 'Warns a member for an optional reason.',
    usage: 'warn <user>'
}