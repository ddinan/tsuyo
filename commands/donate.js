const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`💰 ${lang.Donating}`)
            .setColor(colors.default)
            .setThumbnail('https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
            .addField(lang.WantPerks, `[${lang.ClickToDonate}](https://www.patreon.com/tsuyo)`)
            .addField(lang.DonatorPerks, `💰 \`$5000\`\n💼 ${lang.ActualPerks}`)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        message.channel.send(embed)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['donating'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'donate',
    category: 'Utility',
    description: 'Shows information about donating.',
    usage: 'donate'
}