const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    try {
        const embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setImage(`${message.author.displayAvatarURL()}`)
            .addField('Your avatar:', `[Image URL](${message.author.avatarURL()})`, true)
            .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        if (!message.mentions.users.size) {
            return message.channel.send(embed)
        }

        const user = message.mentions.users.first() || message.author
        const embed2 = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setImage(`${user.avatarURL}`)
            .setThumbnail(`${user.avatarURL}`)
            .addField(`${user.username}'s avatar:`, `${user.avatarURL()}`, true)
            .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        message.channel.send(embed2)
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'avatar',
    category: 'Utility',
    description: 'Returns either yours or [member]\'s avatar.',
    usage: 'avatar [member]'
}