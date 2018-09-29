const Discord = require('discord.js');
const config = require('../config.json');
const { prefix, color } = require('../config.json');
const embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor(config.color)
    .setThumbnail("https://imgur.com/AWOMrDm.png")
    .addField("Fun", `**${prefix}8ball [question]** - Responds with "yes, no or maybe" or if containing "who", it will randomly select a user in the Discord.\n**${prefix}Beep** - Boop.\n**${prefix}Cat** - Sends a random picture of a cat.\n**${prefix}Coin** - Flips a coin. Great for disputes.\n**${prefix}Gif** - Searches for a gif based on your query.\n**${prefix}Rate** - Reacts with :thumbsup: and :thumbsdown:.\n**${prefix}Say [message]** - Say something as the bot.\n`, true)
    .addField(`Info`, `**${prefix}Avatar <@user>** - Shows the avatar of the specified user. If <@user> isn't specified, it will show your avatar instead.\n**${prefix}Commands** - Shows this menu.\n**${prefix}Help** - Shows information and a link to the official Cogent Discord.\n**${prefix}Ping** - Shows your ping in milliseconds.\n**${prefix}Server** - Shows information about the server.\n**${prefix}Whois** -  Shows information about the specified user. If <@user> isn't specified, it will show your information instead.\n`, true)
    .addField(`Moderation`, `**${prefix}Prune [1-99]** - Deletes specified amount of messages.`, true);
    

module.exports = {
	name: 'commands',
	description: 'Commands and command usage.',
	execute(message) {
		message.channel.send({embed});
	},
};



