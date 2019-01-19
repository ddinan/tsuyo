const Discord = require('discord.js');

module.exports = {
	name: 'ask',
	description: 'Tells people not to ask to ask a question, but to simply ask their question.',
	execute(message) {
        message.channel.send('**HOLD ON!** Don\'t ask if you can ask a question, just ask your question. This saves us time and means we don\'t have to waste time saying "Yes, you can ask a question.".');
	},
};
