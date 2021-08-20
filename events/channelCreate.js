const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, channel) => {
    if (channel.type == "dm") return
    const settings = client.getSettings(channel.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.logChannelUpdates == 'true') {
        if (settings.modLogChannel && channel.guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
            const modLogChannel = channel.guild.channels.cache.find(c => c.name == settings.modLogChannel)
            if (!modLogChannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return
            const embed = new MessageEmbed()
                .setAuthor(`🔨 ${lang.ChannelCreated}`)
                .setColor(colors.green)
                .setDescription(`${lang.CreatedChannel} ${channel}`)
                .setTimestamp()

            modLogChannel.send({
                embeds: [embed]
            })
        }
    }
}