const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const canvacord = require('canvacord')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        function delay(delayInms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                }, delayInms);
            });
        }

        rankuser = message.mentions.users.first() || message.author;

        client.points.ensure(`${message.guild.id}-${rankuser.id}`, {
            user: rankuser.id,
            guild: rankuser.id,
            points: 0,
            level: 1
        })

        const filtered = client.points.filter(p => p.guild === message.guild.id).array();
        const sorted = filtered.sort((a, b) => b.points - a.points);
        const top10 = sorted.splice(0, message.guild.memberCount);
        let i = 0;

        for (const data of top10) {
            await delay(15);
            try {
                i++;
                if (client.users.cache.get(data.user).tag === rankuser.tag) break;
            } catch {
                i = lang.ErrorCountingRank;
                break;
            }
        }
        const key = `${message.guild.id}-${rankuser.id}`;
        let curpoints = Number(client.points.get(key, `points`).toFixed(2));
        let curnextlevel = Number(((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)) * ((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)));
        if (client.points.get(key, `level`) === undefined) i = lang.NoRank;

        let status = rankuser.presence.status;

        const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({
                dynamic: false,
                format: 'png'
            }))
            .setCurrentXP(Number(curpoints.toFixed(2)), colors.default)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), colors.default)
            .setStatus(status, false, 7)
            .renderEmojis(true)
            .setProgressBar(colors.default, "COLOR")
            .setRankColor(colors.default, "COLOR")
            .setLevelColor(colors.default, "COLOR")
            .setUsername(rankuser.username, colors.default)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), lang.Level, true)
            .setDiscriminator(rankuser.discriminator, colors.default);
        rank.build()
            .then(async data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
                return;
            });
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['p'],
    guildOnly: false,
    permLevel: 'member'
}

exports.help = {
    name: 'profile',
    category: 'Economy',
    description: 'Shows yours or [member]\'s profile.',
    usage: 'profile [member]'
}