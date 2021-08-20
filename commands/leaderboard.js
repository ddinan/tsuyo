const {
    MessageEmbed
} = require("discord.js")

const colors = require("../lib/colors.json")

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        function delay(delayInms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2)
                }, delayInms)
            })
        }

        if (!args[0]) return message.channel.send(lang.NoOptionSpecified)
        if (args[0].toLowerCase() !== "xp" && args[0].toLowerCase() !== "money") return message.channel.send(lang.InvalidOption)
        let isGlobal;
        if (args[0].toLowerCase() === "xp") {
            if (args[1]) {
                if (args[1].toLowerCase() === "-g" || args[1].toLowerCase() === "g" || args[1].toLowerCase() === "global" || args[1].toLowerCase() === "-global") {
                    isGlobal = false; // Disabled global XP due to duplication issues
                } else {
                    isGlobal = false;
                }
            } else {
                isGlobal = false;
            }
            const globalName = !isGlobal ? message.guild.name + ":" : "Global";
            const filtered = !isGlobal ? client.points.filter(p => p.guild === message.guild.id).array() : client.points.array();
            const sorted = filtered.sort((a, b) => b.points - a.points)
            const top10 = sorted.splice(0, 10);
            const embed = new MessageEmbed()
                .setTitle(`${globalName} ${lang.Leaderboard}`)
                .setDescription(lang.TopTenXP)
                .setColor(colors.default)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
            let i = 0;
            for (const data of top10) {
                await delay(15);
                try {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user).tag}`, `${lang.PointsUpper}: \`${Math.floor(data.points * 100) / 100}\` | ${lang.Level}: \`${data.level}\``);
                } catch {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user)}`, `${lang.PointsUpper}: \`${Math.floor(data.points * 100) / 100}\` | ${lang.Level}: \`${data.level}\``);
                }
            }
            message.channel.send({
                embeds: [embed]
            })
        } else if (args[0].toLowerCase() === "money") {
            if (args[1]) {
                if (args[1].toLowerCase() === "-g" || args[1].toLowerCase() === "g" || args[1].toLowerCase() === "global" || args[1].toLowerCase() === "-global") {
                    isGlobal = true;
                } else {
                    isGlobal = false;
                }
            } else {
                isGlobal = false;
            }
            const globalName = !isGlobal ? message.guild.name + ":" : "Global";
            const filtered = !isGlobal ? client.money.filter(p => p.guild === message.guild.id).array() : client.money.array();
            const sorted = filtered.sort((a, b) => b.money - a.money)
            const top10 = sorted.splice(0, 10);
            const embed = new MessageEmbed()
                .setTitle(`${globalName} ${lang.Leaderboard}`)
                .setTimestamp()
                .setDescription(lang.TopTenMoney)
                .setColor(colors.default)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
            let i = 0;
            for (const data of top10) {
                await delay(15);
                try {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user).tag}`, `${lang.Money}: \`${Math.floor(data.money * 100) / 100}\``);
                } catch {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user)}`, `${lang.Money}: \`${Math.floor(data.money * 100) / 100}\``);
                    message.channel.send({
                        embeds: [embed]
                    })
                }
            }
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['l', 'top', 'most', 'baltop', 'leaderboards'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'leaderboard',
    category: 'Economy',
    description: 'Shows the top 10 players with the most XP or money.',
    usage: 'leaderboard <xp/money> [-g]'
}