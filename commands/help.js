const colors = require('../lib/colors.json')
const {
    MessageEmbed
} = require('discord.js')


exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

    try {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle(lang.Help)
                .setColor(colors.default)
                .setThumbnail(client.user.avatarURL)
                .addField(lang.Commands, `${lang.CommandsFound} \`${prefix}commands\`.`)
                .addField(lang.InviteMe, `[${lang.ClickToInvite}](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)`)
                .addField(lang.NeedAssistance, `[${lang.ClickToJoinSupport}](https://discord.gg/3hbeQgY)`)
                .setImage("https://i.imgur.com/sCNV086.png")
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        } else {
            // Show individual command/alias/category's help
            let command = args[0]
            if (client.commands.has(command) || client.aliases.has(command)) {
                command = client.commands.get(command) || client.aliases.get(command)

                embed = new MessageEmbed()
                    .setTitle(`${lang.Help} - ${prefix}${command.help.name}`)
                    .setColor(colors.default)
                    .setThumbnail(client.user.avatarURL)
                    .setDescription(`${command.help.description}\n\n**${lang.Usage}:** ${command.help.usage}\n**${lang.Aliases}:** ${command.conf.aliases.join(' | ') || lang.None}`)
                    .addField(lang.PermissionLevel, `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
                    .addField(lang.Category, command.help.category, true)
                    .addField(lang.GuildOnly, command.conf.guildOnly ? lang.Yes : lang.No, true)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
            } else return message.reply(lang.InvalidCommand)
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['h'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'help',
    category: 'Utility',
    description: 'Shows useful information.\nIf <command> is specified, will show description and usage of that command.',
    usage: 'help <command>'
}