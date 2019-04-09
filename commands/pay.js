const Discord = require('discord.js');
const client = new Discord.Client();
const colors = require('../lib/colors.json');
const money = require('discord-money');

module.exports = {
	name: 'pay',
	async execute (message, args) {
        const givingTo = args[0];
        const amount = parseInt(args[1]);
        
        money.fetchBal(message.author.id).then((i) => {
            if (isNaN(amount)) {
                return message.reply(`invalid syntax. Try /pay [name] [amount].`);
            }
            
            else if (amount <= 1) {
                return message.reply(`you need to input a number between 1 and ${i.money}`);
            }
            
            if (i.money < amount) {
                message.channel.send("You don't have enough money.");
            } 
            
            else {
                const user = message.mentions.users.first();
                const bal = i.money - amount;
                
                if (user.id === message.author.id) { // Prevent giving yourself money
                    message.channel.send("You can't give yourself money.");
                } else {
                    const sent = new Discord.RichEmbed()
                    .setTitle('💰 Money')
                    .setDescription(`**SUCCESS!** Your new balance is \`$${bal}\`.`)
                    .setColor(colors.green)
                    .setTimestamp();

                    money.updateBal(message.author.id, -amount).then((i) => {}); // Remove money from you
                    money.updateBal(user.id, amount).then((i) => {}); // Give that money to the mentioned member

                    message.channel.send(sent);
                    
                    const received = new Discord.RichEmbed()
                    .setTitle('💰 Money')
                    .setDescription(`You have received \`$${amount}\` from **${message.author.tag}**.`)
                    .setColor(colors.blue)
                    .setTimestamp(); 
                    
                    message.client.users.get(user.id).send(received).catch(err => {}); 
                    
                }
            }
        });
	},
};