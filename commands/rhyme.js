const {
    MessageEmbed
} = require('discord.js')

const rhyme = require('rhyme')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (!args[0]) return message.channel.send(lang.NoArgumentSpecified)

        const embed = new MessageEmbed()
            .setColor(colors.default)
            .setDescription(lang.FindingRhymes)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        const msg = await message.channel.send({
            embeds: [embed]
        })

        rhyme(async (rl) => {
            let rhymes = ''
            const words = rl.rhyme(args.join(' '))

            words.forEach(word => {
                rhymes += word.toProperCase() + ', '
            })

            rhymes = rhymes.slice(0, -2)

            embed = new MessageEmbed()
                .setTitle(`${args[0]}`)
                .setColor(colors.default)
                .setDescription(`${rhymes || lang.NoRhymes}`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            msg.edit(embed)
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['ryme', 'rhime', 'rime', 'rhymes'], // Since people can't spell...
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'rhyme',
    category: 'Fun',
    description: 'Shows all of the words that rhyme with <word>.',
    usage: 'rhyme <word>'
}