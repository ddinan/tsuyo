const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

module.exports = (client, oldMember, newMember) => {
    let embed
    const settings = client.getSettings(oldMember.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (!settings.logMemberUpdates == true) return
    if (!settings.modLogChannel) return
    if (!oldMember.guild.channels.cache.find(c => c.name == settings.modLogChannel)) return
    const modLogChannel = oldMember.guild.channels.cache.find(c => c.name == settings.modLogChannel)
    if (!modLogChannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return
    if (!modLogChannel.permissionsFor(oldMember.guild.me).has('SEND_MESSAGES')) return

    if (oldMember.nickname !== newMember.nickname) {
        const embed = new MessageEmbed()
            .setAuthor(`👤 ${lang.NickChanged}`)
            .setColor(colors.default)
            .setDescription(`<@${newMember.id}> ${lang.ChangedNick}`)
            .addField(lang.OldNick, `${oldMember.nickname !== undefined ? `${oldMember.nickname}` : oldMember.username}`, true)
            .addField(lang.NewNick, `${newMember.nickname !== undefined ? `${newMember.nickname}` : oldMember.username}`, true)
            .setThumbnail(`${oldMember.user.displayAvatarURL}`)
            .setTimestamp()

        modLogChannel.send({
            embeds: [embed]
        }).catch()
    }

    if (oldMember.user.name !== newMember.user.name) {
        const embed = new MessageEmbed()
            .setAuthor(`👤 ${lang.UsernameChanged}`)
            .setColor(colors.default)
            .setDescription(`<@${newMember.id}> ${lang.ChangedUsername}`)
            .addField(lang.OldUsername, `${oldMember.username}`, true)
            .addField(lang.NewUsername, `${newMember.username}`, true)
            .setThumbnail(`${oldMember.user.displayAvatarURL}`)
            .setTimestamp()

        modLogChannel.send({
            embeds: [embed]
        }).catch()
    }

    if (oldMember.roles !== newMember.roles) {
        let output = ''
        let outputNew = ''

        oldMember.roles.cache.forEach(role => {
            output += '\n' + role.name
        })

        newMember.roles.cache.forEach(role => {
            outputNew += '\n' + role.name
        })

        if (output == outputNew) return

        embed = new MessageEmbed()
            .setAuthor(`👤 ${lang.RolesUpdated}`)
            .setColor(colors.default)
            .setDescription(`${lang.RolesUpdatedFor} <@${newMember.id}>`)
            .addField(lang.OldRoles, `${output}`, true)
            .addField(lang.NewRoles, `឵${outputNew}`, true)
            .setThumbnail(`${oldMember.user.displayAvatarURL}`)
            .setTimestamp()

        modLogChannel.send({
            embeds: [embed]
        }).catch()
    }
}