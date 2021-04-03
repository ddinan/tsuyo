const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const canvacord = require('canvacord')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        function delay(delayInms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                }, delayInms);
            });
        }
        //get the rankuser
        rankuser = message.mentions.users.first() || message.author;

        client.points.ensure(`${message.guild.id}-${rankuser.id}`, {
            user: rankuser.id,
            guild: rankuser.id,
            points: 0,
            level: 1
        })
        //do some databasing
        const filtered = client.points.filter(p => p.guild === message.guild.id).array();
        const sorted = filtered.sort((a, b) => b.points - a.points);
        const top10 = sorted.splice(0, message.guild.memberCount);
        let i = 0;
        //count server rank sometimes an error comes
        for (const data of top10) {
            await delay(15);
            try {
                i++;
                if (client.users.cache.get(data.user).tag === rankuser.tag) break;
            } catch {
                i = `Error counting Rank`;
                break;
            }
        }
        const key = `${message.guild.id}-${rankuser.id}`;
        //math
        let curpoints = Number(client.points.get(key, `points`).toFixed(2));
        //math
        let curnextlevel = Number(((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)) * ((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)));
        //if not level == no rank
        if (client.points.get(key, `level`) === undefined) i = `No Rank`;
        //define a temporary embed so its not coming delayed
        const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Calculating...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")
            .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()
        let tempmsg = await message.channel.send(embed)
        //global local color var.
        let color;
        //define status of the rankuser
        let status = rankuser.presence.status;
        //do some coloring for user status cause cool
        if (status === "dnd") {
            color = "#ff0048";
        } else if (status === "online") {
            color = "#00fa81";
        } else if (status === "idle") {
            color = "#ffbe00";
        } else {
            status = "streaming";
            color = "#a85fc5";
        }
        //define the ranking card
        const rank = new canvacord.Rank()
            .setAvatar(rankuser.displayAvatarURL({
                dynamic: false,
                format: 'png'
            }))
            .setCurrentXP(Number(curpoints.toFixed(2)), color)
            .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
            .setStatus(status, false, 7)
            .renderEmojis(true)
            .setProgressBar(color, "COLOR")
            .setRankColor(color, "COLOR")
            .setLevelColor(color, "COLOR")
            .setUsername(rankuser.username, color)
            .setRank(Number(i), "Rank", true)
            .setLevel(Number(client.points.get(key, `level`)), "Level", true)
            .setDiscriminator(rankuser.discriminator, color);
        rank.build()
            .then(async data => {
                //add rankcard to attachment
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                // Send the attachment in the message channel
                message.channel.send(attachment);
                //send that embed
                await message.channel.send(embed);
                //delete that temp message
                await tempmsg.delete();
                return;
            });
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
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