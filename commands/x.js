const Discord = require('discord.js');

module.exports = {
	name: 'x',
	execute (message) {
        
        message.channel.send("🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲\n🌲🐻⬛⬛⬛⚔⬛⬛⚔⬛🌲\n🌲🌲🌲🌲🌲🌲🌲🌲🌲⬛🌲\n🌲🍯⬛⬛⚔⬛⬛⬛⬛⬛🌲\n🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲").then(msg => {
            msg.react('➡');
            
            const filter = (reaction, user) => {
                ['➡'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '➡') {
                    message.reply('you reacted with a ➡.');
                }
            })
            .catch(collected => {
                message.reply('you didn\'t react.');
            });
        });
	},
};



