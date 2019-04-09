const money = require('discord-money');
const moment = require('moment');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'daily',
	execute(message) {

        
        if (money[message.author.username + message.guild.name] != moment().format('L')) {
            money[message.author.username + message.guild.name] = moment().format('L')
            money.updateBal(message.author.id, 100).then((i) => {
                message.channel.send({embed: {
                    color: 3447003,
                    description: ':moneybag: **You recieved your daily reward of `$100`!**',
                    author: {
                        name: `${message.author.username}`,
                        icon_url: message.author.avatarURL 
                    }
                }});
            })
        } else {
            message.channel.send({embed: {
                color: 3447003,
                description: '**You already recieved your daily reward. You can claim it again in ' + moment().endOf('day').fromNow() + '.**',
                author: {
                    name: `${message.author.username}`,
                    icon_url: message.author.avatarURL 
                }
            }});
        }
	},
};



