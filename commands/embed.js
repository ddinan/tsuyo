const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'embed',
	execute(message, args) {
        let input = args.join(" ");
        
        var arr = args.split(",");
        var title = arr[0];
        var desc = arr[1];
        var color = arr[2];
        
        const embed = new Discord.RichEmbed()
            .setTitle(title)
            .setDescription(desc)
            .setColor(color)
        
        if (!input) { 
            const { prefix } = require('../config.json');
            message.reply(`Invalid syntax. **${prefix}embed [title] <description> <#color>`);
        } else { 
            message.channel.send({embed});
        }
	},
};
