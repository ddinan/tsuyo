const fs = require("fs");
const {
    MessageEmbed
} = require("discord.js")
const colors = require("../lib/colors.json");

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.channel.type === `dm`) return;

    if (client.getSettings(message.guild.id).pointsEnabled === 'true') {
        const key = `${message.guild.id}-${message.author.id}`
        //const key2 = `${message.author.id}`

        /* Disabled global XP due to issues with duplication
        client.points.ensure(`${message.guild.id}-${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1
        })*/

        client.points.ensure(`${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1
        })

        var msgl = message.content.length / (Math.floor(Math.random() * (message.content.length - message.content.length / 100 + 1) + 10))
        if (msgl < 10) {
            var randomnum = Math.floor((Math.random() * 2) * 100) / 100
            client.points.math(key, `+`, randomnum, `points`)
            client.points.inc(key, `points`);

            //client.points.math(key2, `+`, randomnum, `points`)
            //client.points.inc(key2, `points`);
        } else {
            var randomnum = 1 + Math.floor(msgl * 100) / 100

            client.points.math(key, `+`, randomnum, `points`)
            client.points.inc(key, `points`);

            //client.points.math(key2, `+`, randomnum, `points`)
            //client.points.inc(key2, `points`);
        }

        const curLevel = Math.floor(0.35 * Math.sqrt(client.points.get(key, 'points')))
        //const curLevel2 = Math.floor(0.2 * Math.sqrt(client.points.get(key, 'points')))

        if (client.points.get(key, `level`) < curLevel) {
            const embed = new MessageEmbed()
                .setTitle(`Ranking of:  ${message.author.username}`)
                .setDescription(`You've leveled up to guild level: **\`${curLevel}\`**! (Points: \`${Math.floor(client.points.get(key, `points`) * 100) / 100}\`) `)
                .setColor(colors.green)
                .setTimestamp()

            message.channel.send(`<@` + message.author.id + `>`)
            message.channel.send({
                embeds: [embed]
            })
            client.points.set(key, curLevel, `level`)
        }

        /*if (client.points.get(key2, `level`) < curLevel2) {
            const embed = new MessageEmbed()
                .setTitle(`Ranking of:  ${message.author.username}`)
                .setTimestamp()
                .setDescription(`You've leveled up to level: **\`${curLevel2}\`**! (Points: \`${Math.floor(client.points.get(key2, `points`) * 100) / 100}\`) `)
                .setColor(colors.green);
            message.channel.send(`<@` + message.author.id + `>`);
            message.channel.send({
            embeds: [embed]
        })
            client.points.set(key2, curLevel2, `level`);
        }*/
    }
};