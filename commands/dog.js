const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {       
    request(`https://dog.ceo/api/breeds/image/random`, function(error, body) {
		var result = JSON.parse(body.body);
		const embed = new Discord.RichEmbed()
		.setColor(colors.teal)
		.setImage(result.message)

		message.channel.send(embed);
	})
};

exports.conf = {
  enabled: true,
  aliases: ['pup', 'doggo', 'doge', 'puppy'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'dog',
  category: 'Fun',
  description: 'Shows a random doggo.',
  usage: 'dog'
};
