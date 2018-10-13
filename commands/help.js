const Discord = require('discord.js');
const config = require('../config.json');
const { prefix, color } = require('../config.json');
const embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor(config.color)
    .setImage("https://imgur.com/S7m3PJv.png")
    .setThumbnail("https://imgur.com/AWOMrDm.png")
    .addField("Commands", `Commands can be found by typing ${prefix}commands.`, true)
    .addField("Want to invite me to your Discord?", `https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=8`, true)
    .addField(`Join the official Cogent Discord`, `https://discord.gg/3hbeQg`, true);

module.exports = {
	name: 'help',
	description: 'Helpful stuff.',
	execute(message) {
		message.channel.send({embed});
	},
};



