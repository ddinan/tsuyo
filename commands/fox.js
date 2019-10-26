const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {       
    request(`https://randomfox.ca/floof/`, function(error, body) {
		var result = JSON.parse(body.body);
		const embed = new Discord.RichEmbed()
		.setColor(colors.teal)
		.setImage(result.image);

		message.channel.send(embed);
	})
};

exports.conf = {
  enabled: true,
  aliases: ['fox', 'kitsune'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'fox',
  category: 'Fun',
  description: 'Shows a random fox.',
  usage: 'fox'
};
