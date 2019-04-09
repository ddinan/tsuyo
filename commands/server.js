const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'server',
	execute(message) {
        const embed = new Discord.RichEmbed()
            .setAuthor("Server Information")
            .setColor(colors.blue)
            .setThumbnail(`${message.guild.iconURL}`)
            .addField("Server name:", `${message.guild.name}`, true)
            .addField("Owner:", `${message.guild.owner}`, true)
            .addField("Verified:", `${message.guild.verified}`, true)
            .addField("Total members:", `${message.guild.memberCount}`, true)
            .addField("Server ID", `${message.guild.id}`, true)
            .addField("Created", `By **${message.guild.owner.user.tag}** on ${message.guild.createdAt}`, true)
            .addField("AFK", `**Channel:** ${message.guild.afkChannel}\n **Timeout:** ${message.guild.afkTimeout} seconds.`, true)
            .addField("Region", `${message.guild.region}`, true)
            .setTimestamp();
        
		message.channel.send({embed});
	},
};

