const money = require('discord-money');

module.exports = {
	name: 'take',
	execute(message) {
        money.updateBal(message.author.id, -500).then((i) => {
            message.channel.send(`**You paid your fine of $500!**\n**New Balance:** ${i.money}`);
        })
	},
};



