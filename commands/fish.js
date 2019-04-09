const Discord = require('discord.js');
const money = require('discord-money');

module.exports = {
	name: 'fish',
	execute (message) {
        
        money.fetchBal(message.author.id).then((i) => {
            if (i.money < 10) {
                message.channel.send(`You need at least \`$10\` to go fishing.`);
            } else {
                    
                const percent = Math.random();
                
                if (percent < 0.45) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught nothing.**`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.70) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 🐟**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.76) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 🥫**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.81) {
                    money.updateBal(message.author.id, 40).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught found \`$50\`**!`);
                        message.channel.send(`\`$40\` was added to your balance. _($10 subtracted for going fishing)_`);
                    })
                } else if (percent < 0.85) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 👢**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.88) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 🐡**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.90) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 🦈**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.908) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 🐋**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } else if (percent < 0.90805) {
                    money.updateBal(message.author.id, -10).then((i) => {
                        message.channel.send(`🎣 **You went fishing and caught a 🧜**!`);
                        message.channel.send(`\`$10\` was deducted from your balance.`);
                    })
                } 
            }
        });
	},
};



