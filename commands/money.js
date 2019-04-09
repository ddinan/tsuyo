const money = require('discord-money');

module.exports = {
	name: 'money',
	execute(message) {
        money.fetchBal(message.author.id).then((i) => {
            message.channel.send({embed: {
                color: 3447003,
                description: `:moneybag: **Your balance: **\`$${i.money}\``,
                author: {
                    name: `${message.author.username}`,
                    icon_url: message.author.avatarURL 
                }
            }});
        })
    }
};



