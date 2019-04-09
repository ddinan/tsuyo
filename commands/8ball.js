const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: '8ball',
	execute(message, args) {
        const results = ['Yes.', 'No.', 'Maybe.'];
        const result = results[Math.floor(Math.random()*results.length)];
        let input = args.join(" ");
        
        if (!input) { 
            const embed = new Discord.RichEmbed()
            .setColor(colors.blue)
            .setTitle('Invalid Syntax')
            .setDescription('`/8ball [message]`\n\nIf question contains "who" or "whose", a random member from the guild will be provided.');
            
            message.channel.send(embed);
        } 
        
        else {
            if (message.content.includes('who') || message.content.includes('Who')) {
                var member = message.guild.members.random().displayName;
                message.channel.send(`${member}.`);
            } else {
                message.channel.send(result);
            }
        }
    }
};