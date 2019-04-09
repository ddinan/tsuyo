const Discord = require('discord.js');
const config = require('../config.json');
const { prefix, sent_msg } = require('../config.json');
const colors = require('../lib/colors.json');
const embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor(colors.blue)
    .setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/845886deb497cbb6d181243a0d1de13f.png?size=2048")
    .setImage("https://i.imgur.com/OYnkRF7.png")
    .addField("Commands", `Commands can be found by typing \`${prefix}commands\`.`)
    .addField("Want to invite me to your Discord?", `[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)`)
    .addField(`Need more assistance?`, `Why not join the official Cogent bot community Discord? \n[Click here to join.](https://discord.gg/3hbeQgY)`);

module.exports = {
	name: 'help',
	execute(message) {
		message.channel.send(embed).catch(err => {});
	},
};



