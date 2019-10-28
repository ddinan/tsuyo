const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {       
    request(`https://dog.ceo/api/breeds/image/random`, function(error, body) {
		var result = JSON.parse(body.body);
		const embed = new Discord.RichEmbed()
      .setColor(colors.teal)
      .setImage(result.message)
      .setFooter(`🐶`,
      'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048');

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
