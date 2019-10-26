const Discord = require('discord.js');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {
  	const icon = message.guild.iconURL == null ? 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' : message.guild.iconURL;
  	const embed = new Discord.RichEmbed()
  	.setAuthor("Server Information")
  	.setColor(colors.teal)
  	.setThumbnail(icon)
  	.addField("Server name:", `${message.guild.name}`, true)
  	.addField("Owner:", `${message.guild.owner}`, true)
  	.addField("Verified:", `${message.guild.verified}`, true)
  	.addField("Total members:", `${message.guild.memberCount}`, true)
  	.addField("Server ID", `${message.guild.id}`, true)
  	.addField("Created", `By **${message.guild.owner}** on ${message.guild.createdAt}`, true)
  	.addField("AFK", `**Channel:** ${message.guild.afkChannel}\n **Timeout:** ${message.guild.afkTimeout} seconds.`, true)
  	.addField("Region", `${message.guild.region}`, true)
  	.setTimestamp();
	
	message.channel.send('There was an error!\n' + err).catch();
};

exports.conf = {
  enabled: true,
  aliases: ['serverinfo', 'si'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'server',
  category: 'Utility',
  description: 'Returns info about the server.',
  usage: 'server'
};
