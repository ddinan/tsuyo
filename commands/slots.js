const Discord = require('discord.js');
const colors = require('../lib/colors.json');
const money = require('discord-money');

module.exports = {
	name: 'slots',
	async execute (message, args) {
        const amount = parseInt(args[0]);
        const winnings = amount * 2;
        const slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
        const result1 = Math.floor((Math.random() * slots.length));
        const result2 = Math.floor((Math.random() * slots.length));
        const result3 = Math.floor((Math.random() * slots.length));
        
        const wEmbed = new Discord.RichEmbed()
            .setFooter(`You Won! $${winnings} was added to your balance.`)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(colors.green);

        const embed = new Discord.RichEmbed()
            .setFooter(`You Lost! $${amount} was deducted from your balance.`)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(colors.red);
        
        money.fetchBal(message.author.id).then((i) => {
            if (isNaN(amount)) {
                return message.reply(`invalid syntax. Try /slots [int].`);
            }
            
            else if (amount > i.money) {
                return message.channel.send(`You don't have enough money.`);
            }
            
            else if (amount < 1) {
                return message.channel.send(`You can't bet \`$0\`.`);
            }
            
            if (i.money < 1) {
                message.channel.send(`You need at least \`$1\` to use the slot machine.`);
            }
            
            else {
                if (slots[result1] === slots[result2] && slots[result3]) {
                    message.channel.send(wEmbed);
                    money.updateBal(message.author.id, winnings).then((i) => {});
                } 
                
                else {
                    message.channel.send(embed);
                    money.updateBal(message.author.id, -amount).then((i) => {});
                }
            }
        });
	},
};