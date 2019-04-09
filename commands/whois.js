const Discord = require('discord.js');
const config = require('../config.json');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'whois',
	execute(message) {
        const embed = new Discord.RichEmbed() // Embed for when a user isn't mentioned.
            .setAuthor(`${message.author.username}`)
            .setColor(colors.blue)
            .setThumbnail(`${message.author.displayAvatarURL}`)
            .addField("ID", `${message.author.id}`, true)
            .addField("Status", `${message.author.presence.status}`, true)
        
		if (!message.mentions.users.size) {
			return message.channel.send(embed);
		}
        
        const user = message.mentions.users.first() || message.author;
        const embed2 = new Discord.RichEmbed() // Embed for when a user is mentioned.
            .setAuthor(`${user.username}`)
            .setColor(colors.blue)
            .setThumbnail(`${user.displayAvatarURL}`)
            .addField("ID", `${user.id}`, true)
            .addField("Status", `${user.presence.status}`, true)

		message.channel.send(embed2);
	},
};
