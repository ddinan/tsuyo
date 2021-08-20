const ms = require('ms')
const got = require(`got`)
const request = require('request')
const {
    MessageEmbed
} = require('discord.js')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const lavender = '#9873AC'
        if (!args[0]) return message.channel.send('You need to specify either info, server or skin.')

        if (args[0] === "info" || args[0] === "i" || args[0] === "whois") {
            if (!args[1]) {
                return message.channel.send(lang.NoUserSpecified)
            }

            request(`https://www.classicube.net/api/player/${args[1]}`, function(error, body) {
                var result = JSON.parse(body.body)
                if (!result || result.username === null) return message.channel.send(lang.InvalidUser)

                const embed = new MessageEmbed()
                    .setTitle(result.username)
                    .setColor(lavender)
                    .setThumbnail(`https://www.classicube.net/face/${result.username}.png`)
                    .addField(lang.ID, result.id, true)
                    .addField(lang.Premium, result.premium, true)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
            })
        }

        if (args[0] === "server") {}

        if (args[0] === "skin") {
            if (args.length === 1) return message.channel.send(`You need to specify a username to get the skin of\nE.g, \`!info Venk\` \nYou can also use +name to get the Minecraft skin.`)

            if (args[1].startsWith('+')) {
                const skin = args[1].replace('+', '')

                const embed = new MessageEmbed()
                    .setAuthor(skin + lang.UsersSkin)
                    .setTitle(lang.SkinUrl)
                    .setURL(`https://minotar.net/skin/${skin}.png`)
                    .setColor('#3BCE3B')
                    .setImage(`https://minotar.net/skin/${skin}.png`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
            } else {
                request(`https://www.classicube.net/api/player/${args[1]}`, function(error, body) {
                    var result = JSON.parse(body.body)
                    if (!result || result.username === null) return message.channel.send(`\`${args[1]}\` is not a registered user.`)

                    const embed = new MessageEmbed()
                        .setAuthor(result.username + `'s skin`)
                        .setTitle(lang.SkinUrl)
                        .setURL(`https://www.classicube.net/skins/${result.username}.png`)
                        .setColor(lavender)
                        .setImage(`https://www.classicube.net/skins/${result.username}.png`)
                        .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                        .setTimestamp()

                    message.channel.send({
                        embeds: [embed]
                    })
                })
            }
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['cc'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'classicube',
    category: 'Utility',
    description: 'Shows information about ClassiCube.',
    usage: 'classicube <info/server/skin> <name>'
}