const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
        const input = args[0]
        if (input == lang.Rock || input == lang.Paper || input == lang.Scissors) {
            const result = [
                lang.Rock,
                lang.Paper,
                lang.Scissors
            ]

            const picker = Math.floor(Math.random() * result.length)
            if (input == lang.Rock && result[picker] == lang.Rock) {
                message.channel.send(`${lang.IChose} :punch: ${lang.Too}\n**${lang.ItWasATie}**!`)
            } else if (input == lang.Paper && result[picker] == lang.Paper) {
                message.channel.send(`${lang.IChose} :raised_hand: ${lang.Too}\n**${lang.ItWasATie}**!`)
            } else if (input == lang.Scissors && result[picker] == lang.Scissors) {
                message.channel.send(`${lang.IChose} :v: ${lang.Too}\n**${lang.ItWasATie}**!`)
            }

            // If bot wins
            else if (input == lang.Scissors && result[picker] == lang.Rock) {
                message.channel.send(`${lang.IChose} :punch:\n**${lang.YouLose}**!`)
            } else if (input == lang.Rock && result[picker] == lang.Paper) {
                message.channel.send(`${lang.IChose} :raised_hand:\n**${lang.YouLose}**!`)
            } else if (input == lang.Paper && result[picker] == lang.Scissors) {
                message.channel.send(`${lang.IChose} :v:\n**${lang.YouLose}**!`)
            }

            // If bot loses
            else if (input == lang.Rock && result[picker] == lang.Scissors) {
                message.channel.send(`${lang.IChose} :v:\n**${lang.YouWin}**!`)
            } else if (input == lang.Paper && result[picker] == lang.Rock) {
                message.channel.send(`${lang.IChose} :punch:\n**${lang.YouWin}**!`)
            } else if (input == lang.Scissors && result[picker] == lang.Paper) {
                message.channel.send(`${lang.IChose} :raised_hand:\n**${lang.YouWin}**!`)
            }
        } else {
            let command = client.commands.get("rps")
            const embed = new MessageEmbed()
                .setColor(colors.red)
                .setTitle(lang.InvalidSyntax)
                .setDescription(`\`${prefix}${command.help.usage}\`\n\n${command.help.description}`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['psr', 'spr'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'rps',
    category: 'Utility',
    description: 'A simple game of Rock Paper Scissors.',
    usage: 'rps <option>'
}