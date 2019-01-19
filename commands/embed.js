const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'embed',
	description: 'Embeds your message.',
	execute(message, args) {
        let title = args[0];
        let description = args[1];
        let input = args.join(" ");
        const embed = new Discord.RichEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(colors.blue)
        
        if (!input) { 
            const { prefix } = require('../config.json');
            message.reply(`Invalid syntax. **${prefix}embed [title] <description>`);
        } else { 
            message.channel.send({embed});
        }
	},
};
