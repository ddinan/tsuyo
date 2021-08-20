const {
    MessageEmbed
} = require("discord.js");

const colors = require("../lib/colors.json");
const moment = require("moment");
const version = require("discord.js");
const ip = require("ip"); // We're only using this to get the IP of the dashboard, only bot developers can see the IP
require("moment-duration-format");

exports.run = (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const duration = moment
            .duration(client.uptime)
            .format(" D [days], H [hrs], m [mins], s [secs]")
        const port = process.env.port || 3000

        const embed = new MessageEmbed()
            .setAuthor(lang.ProcessInformation)
            .setColor(colors.default)
            .setThumbnail(client.user.avatarURL)
            .addField(lang.RAMUsage, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
            .addField(`Discord.js ${lang.Version}`, `v${version}`, true)
            .addField(`NPM ${lang.Version}`, `${process.version}`, true)
            .addField(lang.Uptime, `${duration}`, true)
            .addField(lang.DashboardURL, `${ip.address()}:${port}`, true)
            .addField(lang.VoteURL, `${ip.address()}:80`, true)
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
    aliases: ["status", "processes"],
    guildOnly: false,
    permLevel: "Bot Developer",
};

exports.help = {
    name: "process",
    category: "Admin",
    description: "Displays informative statistics about usage and webhooks.",
    usage: "process",
};