const Discord = require('discord.js');
const colors = require('../lib/colors.json');
const embed = new Discord.RichEmbed()
    .setTitle("Voting")
    .setColor(colors.blue)
    .setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/845886deb497cbb6d181243a0d1de13f.png?size=2048")
    .addField(`Want to help out?`, `[Click here to vote.](https://discordbots.org/bot/492871769485475840/vote)`)
    .addField(`Rewards`, `💰 \`$200\``);

module.exports = {
	name: 'vote',
	execute(message) {
		message.channel.send(embed);
	},
};



