const Discord = require('discord.js');
const config = require('../config.json');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the mentioned user, or your own avatar if no user is mentioned.',
	execute(message) {
        const embed = new Discord.RichEmbed() // Embed for when a user isn't mentioned.
            .setColor(colors.blue)
            .setImage(`${message.author.displayAvatarURL}`)
            .setThumbnail(`${message.author.displayAvatarURL}`)
            .addField("Your avatar:", `${message.author.displayAvatarURL}`, true)
        
		if (!message.mentions.users.size) {
			return message.channel.send(embed);
		}
        
        const user = message.mentions.users.first() || message.author;
        const embed2 = new Discord.RichEmbed() // Embed for when a user is mentioned.
            .setColor(colors.blue)
            .setImage(`${user.displayAvatarURL}`)
            .setThumbnail(`${user.displayAvatarURL}`)
            .addField(`${user.username}'s avatar:`, `${user.displayAvatarURL}`, true);

		message.channel.send(embed2);
	},
};
