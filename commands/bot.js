const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')
const moment = require('moment')
const version = require('discord.js')
require('moment-duration-format')

exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')

        const embed = new MessageEmbed()
            .setAuthor(lang.BotInformation)
            .setColor(colors.default)
            .setThumbnail(client.user.avatarURL)
            .addField(lang.TotalGuilds, message.client.guilds.cache.size, true)
            .addField(lang.TotalMembers, `${message.client.users.cache.size}`, true)
            .addField(lang.ID, `${message.client.user.id}`, true)
            .addField(lang.HostedIn, `:flag_gb: ${lang.London}`, true)
            .addField(lang.Uptime, `${duration}`, true)
            .addField(lang.CreatedBy, '<@191517443519152129>', true)
            .addField(lang.SupportServer, '[Click here](https://discord.gg/3hbeQgY)')
            .setImage("https://i.imgur.com/sCNV086.png")
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
    aliases: ['botinfo'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'bot',
    category: 'Utility',
    description: 'Displays information about the bot',
    usage: 'bot'
}