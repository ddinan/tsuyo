const Discord = require("discord.js");
const colors = require("../lib/colors.json");

exports.run = async (client, message, args) => {
    try {
        function delay(delayInms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                }, delayInms);
            });
        }

        if (!args[0]) return message.channel.send(`You need to specify a type. Try either \`xp\` or \`money\`.`)
        if (args[0].toLowerCase() !== "xp" && args[0].toLowerCase() !== "money") return message.channel.send(`You need to specify a type. Try either \`xp\` or \`money\`.`)
        let isGlobal;
        if (args[0].toLowerCase() === "xp") {
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
            const filtered = !isGlobal ? client.points.filter(p => p.guild === message.guild.id).array() : client.points.array();
            const sorted = filtered.sort((a, b) => b.points - a.points)
            const top10 = sorted.splice(0, 10);
            const embed = new Discord.MessageEmbed()
                .setTitle(`${globalName} Leaderboard`)
                .setTimestamp()
                .setDescription(`Top 10 players with the most XP:`)
                .setColor(colors.default);
            let i = 0;
            for (const data of top10) {
                await delay(15);
                try {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user).tag}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
                } catch {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user)}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
                }
            }
            message.channel.send(embed);
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
            const embed = new Discord.MessageEmbed()
                .setTitle(`${globalName} Leaderboard`)
                .setTimestamp()
                .setDescription(`Top 10 players with the most money:`)
                .setColor(colors.default);
            let i = 0;
            for (const data of top10) {
                await delay(15);
                try {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user).tag}`, `Money: \`${Math.floor(data.money * 100) / 100}\``);
                } catch {
                    i++;
                    embed.addField(`**${i}**. ${client.users.cache.get(data.user)}`, `Money: \`${Math.floor(data.money * 100) / 100}\``);
                }
            }
            message.channel.send(embed);
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
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
    usage: 'leaderboard <xp/money>'
}