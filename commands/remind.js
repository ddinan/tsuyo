const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')
const ms = require('ms')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const reminderTime = args[0]
        if (!reminderTime) {
            const embed = new MessageEmbed()
                .setColor(colors.red)
                .setTitle(lang.InvalidSyntax)
                .setDescription(`\`${client.getSettings(message.guild.id).prefix}remind <${lang.Time}> <${lang.Message}>\`\n\n${lang.RemindFormats}`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        }

        const reminder = args.slice(1).join(' ')

        if (reminder) {
            const success = new MessageEmbed()
                .setColor(colors.green)
                .setTitle(`**${lang.Success}**`)
                .setDescription(`${lang.SuccessMessage} **${reminderTime}**!`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const fail = new MessageEmbed()
                .setColor(colors.red)
                .setTitle(`**${lang.Fail}:**`)
                .setDescription(lang.FailMessage)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send(success)

            setTimeout(function() {
                const remindEmbed = new MessageEmbed()
                    .setColor(colors.default)
                    .addField(lang.Reminder, `${reminder}`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.author.send(remindEmbed)
                    .catch(() => message.reply(fail))
            }, ms(reminderTime))
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
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