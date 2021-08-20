const {
    MessageEmbed
} = require("discord.js")

const colors = require('../lib/colors.json')

module.exports = (client, guild, user) => {
    const settings = client.getSettings(guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")
    const modLogChannel = settings.modLogChannel

    if (modLogChannel && guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
        let embed = new MessageEmbed()
            .setTitle(lang.UserUnbanned)
            .setColor(colors.green)
            .setDescription(`${lang.Name}: ${user.username}\n${lang.ID}: ${user.id}`)

        guild.channels.cache.find(c => c.name === settings.modLogChannel).send({
            embeds: [embed]
        })
    }
}