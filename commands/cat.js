const { get } = require("snekfetch");
const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'cat',
	description: 'Meow.',
	execute(message) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				    .setImage(res.body.file)
                    .setColor(colors.blue)
                
				return message.channel.send({embed});
			});
		} catch(error) {
			return console.log(error.stack);
		}
	}
};