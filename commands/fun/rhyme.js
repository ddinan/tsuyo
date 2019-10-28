const Discord = require('discord.js');
const rhyme = require('rhyme');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) return message.channel.send('You need to input the word to rhyme!');
    
    let msg = await message.channel.send('Finding rhymes...');
    
    rhyme(async (rl) => {
    	let rhymes = '';
      	let words = rl.rhyme(args.join(' '));
      
      	words.forEach(word => {
        	rhymes += word.toPropperCase() + ', ';
      	});

      	rhymes = rhymes.slice(0, -2);
		
		const embed = new Discord.RichEmbed()
		.setTitle('Rhyme')
    	.setColor(colors.teal)
    	.setDescription(`Rhyming words`, `${rhymes || 'None Found.'}`, true);

      	msg.edit(embed);
    });
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'rhyme',
  category: 'Fun',
  description: 'Returns all the words that rhyme with the specified word.',
  usage: 'rhyme <word>'
};