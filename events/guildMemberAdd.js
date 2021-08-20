const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, member) => {
    const settings = client.getSettings(member.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.welcomeEnabled !== 'true') return

    const welcomeChannel = member.guild.channels.cache.find(c => c.name == settings.welcomeChannel)

    if (settings.welcomeMessage && welcomeChannel) {
        if (!welcomeChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
        if (!welcomeChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

        const welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount)
        welcomeChannel.send(welcomeMessage)

    }

    if (settings.logMessageUpdates === 'true') {
        const modLogChannel = member.guild.channels.cache.find(c => c.name === settings.modLogChannel)
        if (settings.modLogChannel && modLogChannel) {
            if (!modLogChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

            const embed = new MessageEmbed()
                .setAuthor(`📥 ${lang.MemberJoined}`)
                .setColor(colors.green)
                .setDescription(`**${lang.TotalMemberCount}:** \`${member.guild.memberCount}\`\n<@${member.user.id}> ${lang.JoinedTheDiscord}.`)
                .setThumbnail(`${member.user.displayAvatarURL}`)
                .setTimestamp()

            modLogChannel.send({
                embeds: [embed]
            })
        }
    }
}