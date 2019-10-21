const request = require('request');
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) return message.channel.send('You need to specify a term to define.')
			
  request(`http://api.urbandictionary.com/v0/define?term=${args[0]}`, function(error, body) {
	var result = JSON.parse(body.body).list[0]
	if(!result) return message.channel.send(`Urban Dictionary does not contain a definition for \`${args[0]}\`.`)

	const embed = new Discord.RichEmbed()
	.setTitle(`📙 Urban Dictionary`)
	.setColor('#1D2439')
	.setThumbnail('https://i.imgur.com/D19IeLX.png')
	.addField(result.word, result.definition)
	.addField('Example: ', result.example)
				
	message.channel.send(embed);
  })
};

exports.conf = {
  enabled: true,
  aliases: ['urban-dictionary', 'ud'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'urban',
  category: 'Fun',
  description: 'Searches the Urban Dictionary for [term].',
  usage: 'urbandictionary [term]'
};
