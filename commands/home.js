const Discord = require('discord.js');

module.exports = {
	name: 'home',
	execute (message) {
        const Barney = message.client.emojis.get("536484192154943509");
        const b2 = message.client.emojis.find(emoji => emoji.name === "b2");
        const b1 = message.client.emojis.find(emoji => emoji.name === "b1");
        const f1 = message.client.emojis.find(emoji => emoji.name === "f1");
        message.channel.send(`${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}`);
        message.channel.send(`${b1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${b1}`);
        message.channel.send(`${b1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${b1}`);
        message.channel.send(`${b1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${b1}`);
        message.channel.send(`${b1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${f1}${b1}`);
        message.channel.send(`${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}`);
	},
};



