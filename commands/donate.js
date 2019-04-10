const Discord = require('discord.js');
const colors = require('../lib/colors.json');
const embed = new Discord.RichEmbed()
    .setTitle("Donating")
    .setColor(colors.blue)
    .setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/845886deb497cbb6d181243a0d1de13f.png?size=2048")
    .addField(`Want exclusive donator perks and more bot features?`, `[Click here to donate.](https://www.patreon.com/cogentbot)`)
    .addField(`Donator Perks`, `💰 \`$5000\`\n💼 \`Donator role\` in the Cogent Bot Discord\n🎉 Access to the exclusive \`donator lounge\`\n🎨 Free \`coloured role\` of your choice`);

module.exports = {
	name: 'donate',
	execute(message) {
		message.channel.send(embed);
	},
};
