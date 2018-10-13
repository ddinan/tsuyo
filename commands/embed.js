const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'Embeds your message.',
	execute(message, args) {
        let title = args[0];
        let description = args[1];
        let color = args[2];
        let image = args[3];
        let thumbnail = args[4];
        let input = args.join(" ");
        const embed = new Discord.RichEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setImage(image)
            .setThumbnail(thumbnail)
        
        if (!input) { 
            const { prefix } = require('../config.json');
            message.reply(`Invalid syntax. **${prefix}embed [title] <description> <hex> <image> <thumbnail>**`);
        } else { 
            message.channel.send({embed});
        }
	},
};
