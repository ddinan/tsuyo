const {
    MessageEmbed
} = require("discord.js");

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6)

        const color = !args[0] ? hex : args[0]

        const embed = new MessageEmbed()
            .setColor(hex)
            .setDescription(`${lang.RandomHex} \`#${hex}\``)
            .setTitle("#" + hex)
            .setImage(`https://derekdinan.github.io/ClassiCube-Stuff/hex-to-img/?hex=${color}`)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        message.channel.send({
            embeds: [embed]
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
};

exports.conf = {
    enabled: true,
    aliases: ["randomcolor", "randomcolour", "colour", "rcol", "rc"],
    guildOnly: false,
    permLevel: "User",
};

exports.help = {
    name: "color",
    category: "Utility",
    description: "Returns a random hex color code.",
    usage: "color",
};