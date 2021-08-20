const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const Icon = message.guild.iconURL === null ?
            'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' : message.guild.iconURL
        const verified = message.guild.verified !== true ? 'No' : 'Yes'
        const afk_channel = message.guild.afkChannel === null ? '**No channel**' : message.guild.afkChannel

        let region = ''
        if (message.guild.region === 'brazil') region = `:flag_br: ${lang.Brazil}`
        if (message.guild.region === 'central-europe') region = `:flag_eu: ${lang.CentralEurope}`
        if (message.guild.region === 'western-europe') region = `:flag_eu: ${lang.WesternEurope}`
        if (message.guild.region === 'hong-kong') region = `:flag_hk: ${lang.HongKong}`
        if (message.guild.region === 'india') region = `:flag_in: ${lang.India}`
        if (message.guild.region === 'japan') region = `:flag_jp: ${lang.Japan}`
        if (message.guild.region === 'russia') region = `:flag_ru: ${lang.Russia}`
        if (message.guild.region === 'singapore') region = `:flag_sg: ${lang.Singapore}`
        if (message.guild.region === 'south-africa') region = `:flag_za: ${lang.SouthAfrica}`
        if (message.guild.region === 'sydney') region = `:flag_au: ${lang.Australia}`
        if (message.guild.region === 'us-central') region = `:flag_us: ${lang.USCentral}`
        if (message.guild.region === 'us-east') region = `:flag_us: ${lang.USEast}`
        if (message.guild.region === 'us-south') region = `:flag_us: ${lang.USSouth}`
        if (message.guild.region === 'us-west') region = `:flag_us: ${lang.USWest}`

        const embed = new MessageEmbed()
            .setColor(colors.default)
            .setThumbnail(Icon)
            .setFooter(`${message.guild.id}`,
                'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
            .setTitle(`${message.guild.name}`)

            .addField(lang.Owner, `${message.guild.owner}`, true)
            .addField(lang.Members, `${message.guild.memberCount}`, true)
            .addField(lang.Verified, `${verified}`)
            .addField(lang.CreatedOn, `${message.guild.createdAt}`, true)
            .addField(lang.AFK, `${afk_channel}\n **${lang.Timeout}:** ${message.guild.afkTimeout} ${lang.Seconds}`, true)
            .addField(lang.Region, `${region}`, true)
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
    aliases: ['serverinfo', 'si'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'server',
    category: 'Utility',
    description: 'Returns info about the server.',
    usage: 'server'
}