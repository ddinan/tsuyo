const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, message) => {
    if (message.author.bot) return
    if (message.guild === null) return

    const settings = client.getSettings(message.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.logMessageUpdates == 'true') {
        if (settings.modLogChannel && message.guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
            const modLogChannel = message.guild.channels.cache.find(c => c.name == settings.modLogChannel)
            if (!modLogChannel.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return

            const embed = new MessageEmbed()
                .setAuthor(`🗑️ ${lang.MessageDeleted}`)
                .setColor(colors.default)
                .setDescription(`${lang.MessageDeletedBy} <@${message.author.id}> ${lang.In} ${message.channel}`)
                .addField(lang.Message, `${message}`)
                .setTimestamp()

            modLogChannel.send({
                embeds: [embed]
            })
        }
    }
}