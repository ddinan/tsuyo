const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

    try {
        if (!args[0]) {
            let currentCategory = ''

            let output = `${lang.Type} ${prefix}commands <${lang.Category}> ${lang.InThatCategory}.`
            const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)

            sorted.forEach(async c => {
                const cat = c.help.category
                if (currentCategory !== cat) {
                    output += `\n**${prefix}commands ${cat.toLowerCase()}**`
                    currentCategory = cat
                }
            })

            const embed = new Discord.MessageEmbed()
                .setTitle(lang.Commands)
                .setColor(colors.default)
                .addField(output, `\n${lang.ValidCategories}:\n\`admin\`, \`economy\`, \`fun\`, \`moderation\`, \`utility\``)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send(embed)
        } else {
            let command = args[0]
            if (client.commands.has(command) || client.aliases.has(command)) {
                command = client.commands.get(command) || client.aliases.get(command)

                const embedTiny = new Discord.MessageEmbed()
                    .setTitle(`${lang.Help} - ${prefix}${command.help.name}`)
                    .setColor(colors.default)
                    .setThumbnail(client.user.avatarURL)
                    .setDescription(`${command.help.description}\n\n**${lang.Usage}:** ${command.help.usage}\n**${lang.Aliases}:** ${command.conf.aliases.join(' | ') || lang.None}`)
                    .addField(lang.PermissionLevel, `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
                    .addField(lang.CategoryUpper, command.help.category, true)
                    .addField(lang.GuildOnly, command.conf.guildOnly ? lang.True : lang.False, true)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send(embedTiny)
            } else {
                const currentCategory = ''
                let output = ''

                const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
                sorted.forEach(c => {
                    const cat = c.help.category.toLowerCase()
                    if (cat == args[0].toLowerCase()) {
                        if (level < client.levelCache[c.conf.permLevel]) return
                        output += '`' + c.help.name + '` '
                    }
                })

                if (!output) return message.reply(lang.InvalidCategory)
                const embed = new Discord.MessageEmbed()
                    .setTitle(lang.Commands)
                    .setColor(colors.default)
                    .setThumbnail(client.user.avatarURL)
                    .setDescription(output)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send(embed)
            }
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['cmds', 'c'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'commands',
    category: 'Utility',
    description: 'Displays a list of all commands under <category>.',
    usage: 'commands <category>'
}