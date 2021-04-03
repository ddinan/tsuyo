const request = require('request')
const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (message.channel.nsfw === false) return message.channel.send(lang.NeedNSFW)
        if (!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setColor(colors.red)
                .setDescription(lang.NoArgumentSpecified)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
            )
        }

        request(`http://api.urbandictionary.com/v0/define?term=${args[0]}`, function(error, body) {
            var result = JSON.parse(body.body).list[0]
            if (!result) {
                return message.channel.send(
                    new Discord.MessageEmbed()
                    .setColor(colors.red)
                    .setDescription(`${lang.UrbanNotFound} \`${args[0]}\`.`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()
                )
            }

            const embed = new Discord.MessageEmbed()
                .setColor('#1D2439')
                .setThumbnail('https://i.imgur.com/D19IeLX.png')
                .setTitle(result.word)
                .setDescription(result.definition)
                .addField(lang.Example, result.example)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send(embed)
        })
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['urban-dictionary', 'ud'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'urban',
    category: 'Fun',
    description: 'Searches the Urban Dictionary for [term].',
    usage: 'urbandictionary <term>'
}