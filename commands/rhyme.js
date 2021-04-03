const Discord = require('discord.js')
const rhyme = require('rhyme')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        if (!args[0]) return message.channel.send('You need to input the word to rhyme!')

        const msg = await message.channel.send(
            new Discord.MessageEmbed()
            .setColor(colors.default)
            .setDescription('Finding rhymes...')
            .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()
        )

        rhyme(async (rl) => {
            let rhymes = ''
            const words = rl.rhyme(args.join(' '))

            words.forEach(word => {
                rhymes += word.toProperCase() + ', '
            })

            rhymes = rhymes.slice(0, -2)

            const embed = new Discord.MessageEmbed()
                .setTitle(`${args[0]}`)
                .setColor(colors.default)
                .setDescription(`${rhymes || 'None Found.'}`)
                .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            msg.edit(embed)
        })
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
    name: 'rhyme',
    category: 'Fun',
    description: 'Returns all of the words that rhyme with the specified word.',
    usage: 'rhyme <word>'
}