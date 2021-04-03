const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const pingEmbed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .addField(`${message.author.id}`, lang.HelloWorld)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        const msg = await message.channel.send(pingEmbed)

        const embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .addField(lang.MessageTrip,
                `${msg.createdTimestamp - message.createdTimestamp}ms`)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        msg.edit(embed)
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
    name: 'ping',
    category: 'Utility',
    description: 'Shows your ping.',
    usage: 'ping'
}