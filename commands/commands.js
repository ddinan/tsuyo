const colors = require('../lib/colors.json')
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

const {
    pagination
} = require('reconlx')

exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

    try {
        if (!args[0]) {
            const currentCategory = ''
            let output = ''
            let output2 = ''
            let output3 = ''
            let output4 = ''
            let output5 = ''

            const sorted = client.commands.sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
            sorted.forEach(c => {
                const cat = c.help.category.toLowerCase()
                if (cat == "admin") {
                    if (level < client.levelCache[c.conf.permLevel]) return
                    output += '`' + c.help.name + '` '
                }
                if (cat == "economy") {
                    if (level < client.levelCache[c.conf.permLevel]) return
                    output2 += '`' + c.help.name + '` '
                }
                if (cat == "fun") {
                    if (level < client.levelCache[c.conf.permLevel]) return
                    output3 += '`' + c.help.name + '` '
                }
                if (cat == "moderation") {
                    if (level < client.levelCache[c.conf.permLevel]) return
                    output4 += '`' + c.help.name + '` '
                }
                if (cat == "utility") {
                    if (level < client.levelCache[c.conf.permLevel]) return
                    output5 += '`' + c.help.name + '` '
                }
            })

            const embed1 = new MessageEmbed()
                .setTitle(lang.Commands)
                .setColor(colors.default)
                .addField(`${lang.Type} ${prefix}commands <${lang.Category}> ${lang.InThatCategory}.`, `\n${lang.ValidCategories}:\n\`admin\`, \`economy\`, \`fun\`, \`moderation\`, \`utility\``)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const embed2 = new MessageEmbed()
                .setTitle('🔮 Admin')
                .setColor(colors.default)
                .addField(`${lang.Type} ${prefix}help <${lang.Command}> ${lang.MoreInfoOnHowToUse}.`, output)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const embed3 = new MessageEmbed()
                .setTitle('💰 Economy')
                .setColor(colors.default)
                .addField(`${lang.Type} ${prefix}help <${lang.Command}> ${lang.MoreInfoOnHowToUse}.`, output2)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const embed4 = new MessageEmbed()
                .setTitle('🎉 Fun')
                .setColor(colors.default)
                .addField(`${lang.Type} ${prefix}help <${lang.Command}> ${lang.MoreInfoOnHowToUse}.`, output3)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const embed5 = new MessageEmbed()
                .setTitle('👮‍♂️ Moderation')
                .setColor(colors.default)
                .addField(`${lang.Type} ${prefix}help <${lang.Command}> ${lang.MoreInfoOnHowToUse}.`, output4)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const embed6 = new MessageEmbed()
                .setTitle('🔨 Utility')
                .setColor(colors.default)
                .addField(`${lang.Type} ${prefix}help <${lang.Command}> ${lang.MoreInfoOnHowToUse}.`, output5)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            const embeds = [
                embed1,
                embed2,
                embed3,
                embed4,
                embed5,
                embed6
            ]

            pagination({
                embeds: embeds,
                channel: message.channel,
                author: message.author,
                fastSkip: false,
                pageTravel: true,
                max: 0,
            })
        } else {
            let command = args[0]
            if (client.commands.has(command) || client.aliases.has(command)) {
                command = client.commands.get(command) || client.aliases.get(command)

                embed = new MessageEmbed()
                    .setTitle(`${lang.Help} - ${prefix}${command.help.name}`)
                    .setColor(colors.default)
                    .setThumbnail(client.user.avatarURL)
                    .setDescription(`${command.help.description}\n\n**${lang.Usage}:** ${command.help.usage}\n**${lang.Aliases}:** ${command.conf.aliases.join(' | ') || lang.None}`)
                    .addField(lang.PermissionLevel, `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
                    .addField(lang.CategoryUpper, command.help.category, true)
                    .addField(lang.GuildOnly, command.conf.guildOnly ? lang.True : lang.False, true)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
            } else {
                const currentCategory = ''
                let output = ''

                const sorted = client.commands.sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
                sorted.forEach(c => {
                    const cat = c.help.category.toLowerCase()
                    if (cat == args[0].toLowerCase()) {
                        if (level < client.levelCache[c.conf.permLevel]) return
                        output += '`' + c.help.name + '` '
                    }
                })

                if (!output) return message.reply(lang.InvalidCategory)

                const embed = new MessageEmbed()
                    .setTitle(lang.Commands)
                    .setColor(colors.default)
                    .setThumbnail(client.user.avatarURL)
                    .setDescription(output)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
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