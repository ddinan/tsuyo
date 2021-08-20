const {
    MessageEmbed
} = require("discord.js")

const colors = require('../lib/colors.json')

module.exports = (client, oldemoji, newemoji) => {
    let settings = client.getSettings(newemoji.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.logEmojiUpdates == "true") {
        let modLogChannel = settings.modLogChannel

        if (modLogChannel && newemoji.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
            let embed = new MessageEmbed()
                .setTitle(`🙂 ${lang.EmojiUpdated}`)
                .setColor(colors.default)
                .setDescription(`${lang.NewName}: ${newemoji.name}\n${lang.OldName}: ${oldemoji.name}\n${lang.ID}: ${newemoji.id}`)
                .addField(lang.NewURL, newemoji.url)
                .addField(lang.OldURL, oldemoji.url)
                .setTimestamp()

            newemoji.guild.channels.cache.find(c => c.name === settings.modLogChannel).send({
                embeds: [embed]
            })
        }
    }
}