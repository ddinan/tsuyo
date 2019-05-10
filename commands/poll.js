const Discord = require('discord.js');
const config = require('../config.json');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'poll',
	execute (message, args) {
        
        const yesEmoji = message.client.emojis.get("568915076913037334");
        const noEmoji = message.client.emojis.get("568915333834866703");
        
        const input = message.content.split(`${config.prefix}poll `);
        
        const embed = new Discord.RichEmbed()
        .setTitle("🗳 Poll")
        .setColor(colors.blue)
        .addField(input, `React with either ${yesEmoji} or ${noEmoji} to vote.`, true)
        .setTimestamp();
        
        if (args.length === 0) {
            message.channel.send(`You need to specify the contents of the poll.\nE.g, \`${config.prefix}poll Does pineapple belong on pizza?\``)
        }
        
        else {
            message.delete();
            message.channel.send(embed).then(message => {
                message.react(yesEmoji)
                .then(() => message.react(noEmoji));
            });
        }
	},
};