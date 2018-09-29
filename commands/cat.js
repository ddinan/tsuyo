const { get } = require("snekfetch");
const Discord = require('discord.js');
const config = require('../config.json');
const color = require('../config.json');

module.exports = {
	name: 'cat',
	description: 'Meow.',
	execute(message) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				    .setImage(res.body.file)
                    .setColor(config.color)
                
				return message.channel.send({embed});
			});
		} catch(error) {
			return console.log(error.stack);
		}
	}
};