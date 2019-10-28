const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {       
    request(`http://aws.random.cat/meow`, function(error, body) {
		var result = JSON.parse(body.body);
		const embed = new Discord.RichEmbed()
      .setColor(colors.teal)
      .setImage(result.file)
      .setFooter(`🐱`,
      'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048');

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
