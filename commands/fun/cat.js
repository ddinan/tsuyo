const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {       
    request(`http://aws.random.cat/meow`, function(error, body) {
		var result = JSON.parse(body.body);
		const embed = new Discord.RichEmbed()
		.setColor(colors.teal)
		.setImage(result.file);

		message.channel.send(embed);
	})
};

exports.conf = {
  enabled: true,
  aliases: ['kitty', 'kitten', 'kit', 'neko'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'cat',
  category: 'Fun',
  description: 'Shows a random cat.',
  usage: 'cat'
};
