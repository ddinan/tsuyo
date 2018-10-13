const Discord = require('discord.js');
const config = require('../config.json');
const color = require('../config.json');

module.exports = {
	name: 'whois',
	description: 'Display information about the mentioned user, or your own avatar if no user is mentioned.',
	execute(message) {
        const embed = new Discord.RichEmbed() // Embed for when a user isn't mentioned.
            .setAuthor(`${message.author.username}`)
            .setColor(config.color)
            .setThumbnail(`${message.author.displayAvatarURL}`)
            .addField("ID", `${message.author.id}`, true)
            .addField("Status", `${message.author.presence.status}`, true)
            .addField("Joined", `${message.author.joinedTimestamp}`, true)
            .addField("Last Message", `${message.author.lastMessage}`, true)
        
		if (!message.mentions.users.size) {
			return message.channel.send(embed);
		}
        
        const user = message.mentions.users.first() || message.author;
        const embed2 = new Discord.RichEmbed() // Embed for when a user is mentioned.
            .setAuthor(`${user.username}`)
            .setColor(config.color)
            .setThumbnail(`${user.displayAvatarURL}`)
            .addField("ID", `${user.id}`, true)
            .addField("Status", `${user.presence.status}`, true)
            .addField("Last Message", `${user.lastMessage}`, true);

		message.channel.send(embed2);
	},
};
