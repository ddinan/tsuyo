const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const embed = new MessageEmbed()
            .setColor(colors.default)
            .setImage(`${message.author.displayAvatarURL()}`)
            .addField(lang.YourAvatar, `[${lang.ImageURL}](${message.author.avatarURL()})`, true)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        if (!message.mentions.users.size) {
            return message.channel.send({
                embeds: [embed]
            })
        }

        const user = message.mentions.users.first() || message.author

        embed = new MessageEmbed()
            .setColor(colors.default)
            .setImage(`${user.avatarURL}`)
            .setThumbnail(`${user.avatarURL}`)
            .addField(`${user.username}${lang.UsersAvatar}`, `${user.avatarURL()}`, true)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        message.channel.send({
            embeds: [embed]
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
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