const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const member = message.mentions.members.first()
        let user = ''
        if (member) user = message.mentions.members.first().user
        if (!member) user = message.author

        client.life.ensure(user.id, {
            member: user.id,
            spouse: 0,
            job: 0
        })

        client.money.ensure(user.id, {
            member: user.id,
            money: 0
        })

        client.reputation.ensure(user.id, {
            member: user.id,
            reputation: 0
        })

        const married = client.life.get(user.id, 'spouse') === 0 ? lang.Nobody : `<@${client.life.get(user.id, 'spouse')}>`

        const embed = new MessageEmbed()
            .setTitle(`${user.tag}`)
            .addField(lang.ID, user.id, true)
            .addField(lang.AccountCreated, user.createdAt, true)
            .addField(lang.Status, user.presence.status, true)
            .addField(lang.MarriedTo, married, true)
            .addField(lang.Reputation, `+${client.reputation.get(user.id, 'reputation')}`, true)
            //.addField(`Job`, user.user, true)
            //.addField(`Achievements`, user.user, true)
            .setThumbnail(user.avatarURL)
            .setColor(colors.default)
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
    aliases: ['user', 'ui', 'i', 'whois'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'info',
    category: 'Utility',
    description: 'Returns info about the user.',
    usage: 'info'
}