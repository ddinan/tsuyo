const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    try {
        const yesEmoji = '✅'
        const noEmoji = message.client.emojis.cache.get('637573919204966410')
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
        const input = message.content.split(`${settings.prefix}poll `)

        const embed = new Discord.MessageEmbed()
            .setTitle('🗳 Poll')
            .setColor(colors.default)
            .addField(`React with either ✅ or ${noEmoji} to vote.`, input, true)
            .setTimestamp()

        if (args.length === 0) {
            message.channel.send(`You need to specify the contents of the poll.\nE.g, \`${settings.prefix}poll Does pineapple belong on pizza?\``)
        } else {
            message.delete()
            message.channel.send(embed).then(message => {
                message.react(yesEmoji)
                    .then(() => message.react(noEmoji))
            })
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
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