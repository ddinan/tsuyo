const Discord = require('discord.js');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {
	let Icon = message.guild.iconURL === null ?
	'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' : message.guild.iconURL;
	let verified_ = message.guild.verified !== true ? 'No' : 'Yes';
	let afk_channel = message.guild.afkChannel === null ? '**No channel**' : message.guild.afkChannel;

	const Sregion = ['brazil', 'central-europe',
	'hong-kong', 'india', 'japan', 'russia',
	'singapore', 'south-africa', 'sydney',
	'us-central', 'us-east', 'us-south',
	'us-west', 'western-europe'];

	region_to_text = () => {
		let i = 0;
		let def;

		const sr_text = [ 'Brazil', 'Central Europe',
		'Hong Kong', 'India', 'Japan', 'Russia',
		'Singapore', 'South Africa', 'Sydney',
		'US Central', 'US South', 'US West',
		'Western Europe']
		
		while (message.guild.region !== Sregion[i]) {
			i++
		};

		def = (value) => {
			v = value - 1;
			return sr_text[v]
		};

		return def(i);
	};

	let embed = new Discord.RichEmbed()
		.setColor(colors.teal)
		.setThumbnail(Icon)
		.setFooter(`${message.guild.id}`,
		"https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
		.setTitle(`${message.guild.name}`)

		.addField("Owner", `${message.guild.owner}`, true)
		.addField("Members", `${message.guild.memberCount}`, true)
		.addField("Verified?", `${verified_}`)
		.addField(`Created on`, `${message.guild.createdAt}`, true)
		.addField("AFK", `${afk_channel}\n **Timeout:** ${message.guild.afkTimeout} seconds.`, true)
		.addField("Region", `${region_to_text()}`, true)
		.setTimestamp();

		message.channel.send(embed);
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