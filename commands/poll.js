const Discord = require('discord.js');
const config = require('../config.json');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'poll',
	execute (message) {
        
        const yesEmoji = message.client.emojis.get("568915076913037334");
        const noEmoji = message.client.emojis.get("568915333834866703");
        
        const args = message.content.split(`${config.prefix}poll `);
        
        const embed = new Discord.RichEmbed()
        .setTitle("🗳 Poll")
        .setColor(colors.blue)
        .addField(args, `React with either ${yesEmoji} or ${noEmoji} to vote.`, true)
        .setTimestamp();
        
        message.delete();
        message.channel.send(embed).then(message => {
            
            message.react(yesEmoji)
			.then(() => message.react(noEmoji));
        });
	},
};