const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, guild, user) => {
    const settings = client.getSettings(guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")
    const modLogChannel = guild.channels.cache.find(c => c.name === settings.modLogChannel)

    if (guild === null) return

    if (settings.logMessageUpdates == 'true') {
        if (settings.modLogChannel && guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
            const modLogChannel = guild.channels.cache.find(c => c.name == settings.modLogChannel)
            if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

            const embed = new MessageEmbed()
                .setTitle(`🔨 ${lang.UserBanned}`)
                .setColor(colors.red)
                .setDescription(`**${lang.TotalMemberCount}:** \`${guild.memberCount}\`\n<@${user.id}> ${lang.BannedFromDiscord}`)
                .setThumbnail(user.displayAvatarURL)
                .setTimestamp()

            modLogChannel.send({
                embeds: [embed]
            })
        }
    }
}