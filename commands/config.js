const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const settings = client.getSettings(message.guild.id)
        const defaults = client.config.defaultSettings
        const overrides = client.settings.get(message.guild.id)
        if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, client.config.defaultSettings)

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(lang.NoPermission)
        }

        if (args[0] === 'edit') {
            if (!args[1]) return message.channel.send(lang.NoOptionSpecified)
            if (!defaults[args[1]]) return message.channel.send(lang.InvalidOption)
            const joinedValue = args.join(' ')
            if (joinedValue.length < 1) return message.channel.send(lang.SpecifyNewValue)
            if (joinedValue === settings[args[1].slice(2)]) return message.channel.send(lang.SettingAlreadyHasValue)

            if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {})

            if (args[1] == 'modLogChannel' || args[1] == 'welcomeChannel') client.settings.set(message.guild.id, args.slice(2).join(' ').replace('#', '').trim(), args[1])
            else client.settings.set(message.guild.id, args.slice(2).join(' '), args[1])

            message.channel.send(`${args[1]} ${lang.EditedTo} ${args.slice(2).join(' ')}!`)
        } else

        if (args[0] === 'del' || args[0] === 'reset') {
            if (!args[1]) return message.channel.send(lang.NoOptionSpecified)
            if (!defaults[args[1]]) return message.channel.send(lang.InvalidOption)
            if (!overrides[args[1]]) return message.channel.send(lang.NoOverrideUsingDefaults)

            const response = await client.awaitchannel.send(message, `${lang.ConfirmReset} ${args[1]} ${lang.ToDefaultValue}`)

            if (['y', 'yes', '1'].includes(response.toLowerCase())) {
                client.settings.delete(message.guild.id, args[1])
                message.channel.send(`${args[1]} ${lang.SuccessfullyReset}.`)
            } else
            if (['n', 'no', 'cancel', '0'].includes(response)) {
                message.channel.send(`${lang.Setting} \`${args[1]}\` ${lang.RemainsAt} \`${settings[args[1]]}\`.`)
            }
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`⚙️ ${lang.ServerSettings}`)
                .setColor(colors.default)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
            Object.keys(client.getSettings(message.guild.id)).forEach((setting) => embed = embed.addField(setting, settings[setting], true))

            await message.channel.send(embed)
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['setting', 'settings', 'conf', 'set', 'setconf', 'configure'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'config',
    category: 'Admin',
    description: 'View or change the settings for your server.',
    usage: 'config <get/edit/reset> <setting> <value>'
}