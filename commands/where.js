const {
    MessageEmbed
} = require('discord.js');

const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (!args[0]) return message.channel.send(lang.NoArgumentSpecified)
        if (!client.channels.cache.get(args[0])) return message.channel.send(lang.NoChannel)
        const channel = client.channels.cache.find(ch => ch.id === args[0])

        const embed = new MessageEmbed()
            .setColor(colors.default)
            .addField(lang.Guild, channel.guild.name)
            .addField(lang.Channel, channel.name)
            .addField(lang.GuildOwner, channel.guild.owner)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        message.author.send({
            embeds: [embed]
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
};

exports.conf = {
    enabled: true,
    aliases: ['whereis', 'whereisthaterrorcomingfrom???', 'source'],
    guildOnly: false,
    permLevel: 'Bot Support'
};

exports.help = {
    name: 'where',
    category: 'Developer',
    description: 'Shows you which Discord has <channel id> and the owner\'s ID',
    usage: 'where <channel id>'
}