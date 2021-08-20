const {
    MessageEmbed
} = require("discord.js");

const colors = require("../lib/colors.json");
exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const prefix = message.guild === null ? ";;" : client.getSettings(message.guild.id).prefix;
        const results = [lang.EightBallYes, lang.EightBallNo, lang.EightBallMaybe];
        const result = results[Math.floor(Math.random() * results.length)];
        const input = args.join(" ");

        if (!input) {
            let command = client.commands.get("8ball")
            const embed = new MessageEmbed()
                .setColor(colors.red)
                .setTitle(lang.InvalidSyntax)
                .setDescription(`\`${prefix}${command.help.usage}\`\n\n${command.help.description}`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        } else {
            if (message.content.toLowerCase().includes("who") || message.content.toLowerCase().includes("whose")) {
                if (message.channel.type === "dm") {
                    const member = [lang.EightBallYou, lang.EightBallMe];
                    const result = member[Math.floor(Math.random() * member.length)];
                    message.channel.send(`${result}`);
                }
                var member = message.guild.members.cache.random();
                const embed = new MessageEmbed()
                    .setColor(colors.default)
                    .setThumbnail(member.avatarURL)
                    .addField(member.displayName, `<@${member.id}>`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                })
            } else {
                message.channel.send(result)
            }
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: false,
    permLevel: "User",
};

exports.help = {
    name: "8ball",
    category: "Utility",
    description: "Ask the mighty 8ball a question. If question contains 'who' or 'whose', a random member from the guild will be chosen.",
    usage: "8ball <question>",
};