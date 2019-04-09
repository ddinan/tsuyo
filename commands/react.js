const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'react',
	execute(message, args) {
        let id = args[0]
        let emoji = args[1];
        
        if (!id) {
            const embed = new Discord.RichEmbed()
            .setColor(colors.blue)
            .setTitle('Invalid Syntax')
            .setDescription('`/react [message ID] :emoji:`\n\nRemember to use `:emoji:` instead of just `emoji`.');
            
            message.channel.send(embed);
        }
        
        else {
            if (emoji) {
                const embed = new Discord.RichEmbed()
                .setColor(colors.blue)
                .setTitle('Invalid Syntax')
                .setDescription('`/react [message ID] :emoji:`\n\nRemember to use `:emoji:` instead of just `emoji`.');
                
                message.channel.fetchMessage(id)
                .then(function (message) {
                    message.react(emoji);
                }) .catch(function(error) {
                    message.channel.send(embed);
                })       
            } else {
                message.channel.send(embed);
            }
        }
	}
};