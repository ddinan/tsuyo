const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, message, messageNew) => {
    if (message.author.bot) return
    if (message.guild === null) return
    if (message.pinned && !messageNew.pinned) return
    if (!message.pinned && messageNew.pinned) return
    if (message.content === messageNew.content) return

    const settings = client.getSettings(message.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.logMessageUpdates == 'true') {
        if (settings.modLogChannel && message.guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
            const modLogChannel = message.guild.channels.cache.find(c => c.name == settings.modLogChannel)
            if (!modLogChannel.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return

            const embed = new MessageEmbed()
                .setAuthor(`📝 ${lang.MessageEdited}`)
                .setColor(colors.default)
                .setDescription(`${lang.MessageEditedBy} <@${messageNew.author.id}> ${lang.In} ${message.channel}`)
                .addField(lang.OldMessage, `${message}`, true)
                .addField(lang.NewMessage, `${messageNew}`, true)
                .setTimestamp()

            if (message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel)) {
                message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel).send({
                    embeds: [embed]
                }).catch()
            }
        }
    }
}