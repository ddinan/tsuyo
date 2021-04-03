const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const ms = require('ms')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const reminderTime = args[0]
        if (!reminderTime) {
            const embed = new Discord.MessageEmbed()
                .setColor(colors.red)
                .setTitle(lang.InvalidSyntax)
                .setDescription(`\/remind <${lang.Time}> <${lang.Message}>\`\n\n${lang.RemindFormats}`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send(embed)
        }

        const reminder = args.slice(1).join(' ')

        if (reminder) {
            const success = new Discord.MessageEmbed()
                .setColor(colors.green)
                .setTitle(`**${lang.Success}**`)
                .setDescription(`${lang.SuccessMessage} **${reminderTime}**!`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const fail = new Discord.MessageEmbed()
                .setColor(colors.red)
                .setTitle(`**${lang.Fail}:**`)
                .setDescription(lang.FailMessage)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send(success)

            setTimeout(function() {
                const remindEmbed = new Discord.MessageEmbed()
                    .setColor(colors.default)
                    .addField(lang.Reminder, `${reminder}`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.author.send(remindEmbed)
                    .catch(() => message.reply(fail))
            }, ms(reminderTime))
        } else {
            message.channel.send(embed)
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['r', 'remindme'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'remind',
    category: 'Utility',
    description: 'Reminds you at the specified time of the specified thing.',
    usage: 'remind <time> <message'
}