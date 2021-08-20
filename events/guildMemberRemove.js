const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, member) => {
    const settings = client.getSettings(member.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.logMessageUpdates === 'true') {
        if (settings.modLogChannel && member.guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
            const modLogChannel = member.guild.channels.cache.find(c => c.name == settings.modLogChannel)
            if (!modLogChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

            const embed = new MessageEmbed()
                .setAuthor(`📤 ${lang.MemberLeft}`)
                .setColor(colors.red)
                .setDescription(`**${lang.TotalMemberCount}:** \`${member.guild.memberCount}\`\n<@${member.user.id}> ${lang.LeftTheDiscord}`)
                .setThumbnail(`${member.user.displayAvatarURL}`)
                .setTimestamp()

            modLogChannel.send({
                embeds: [embed]
            })
        }
    }
}