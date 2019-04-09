const Discord = require('discord.js');
const colors = require('../lib/colors.json');
const embed = new Discord.RichEmbed()
    .setTitle("This is your title, it can hold 256 characters")
    .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
    .setColor(colors.blue)
    .setDescription("This is the main body of text, it can hold 2048 characters.")
    .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
    .setImage("http://i.imgur.com/yVpymuV.png")
    .setThumbnail("http://i.imgur.com/p2qNFag.png")
    .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
    .addField("Inline Field", "They can also be inline.", true)
    .addField("Inline Field 2", "Another inline.", true)
    .addField("Inline Field 3", "You can have a maximum of 25 fields.", true)
    .setTimestamp();

module.exports = {
	name: 'embed-example',
	execute(message) {
		message.channel.send({embed});
	},
};
