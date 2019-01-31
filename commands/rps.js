module.exports = {
	name: 'rps',
	description: 'Rock paper scissors.',
	execute(message, args) {
        let input = args[0];
        
        if (input == "rock" || input == "paper" || input == "scissors") {
            let result = [
                "rock",
                "paper",
                "scissors"
            ];

            let picker = Math.floor(Math.random() * result.length);
            if (input == "rock" && result[picker] == "rock") { 
                message.channel.send('I chose :punch: too!\n**It was a tie**!');
            } else if (input == "paper" && result[picker] == "paper") { 
                message.channel.send('I chose :raised_hand: too!\n**It was a tie**!');
            } else if (input == "scissors" && result[picker] == "scissors") { 
                message.channel.send('I chose :v: too!\n**It was a tie**!');
            }
            
            // If bot wins
                
             else if (input == "scissors" && result[picker] == "rock") {
                message.channel.send('I chose :punch:\n**I win**!');
            } else if (input == "rock" && result[picker] == "paper") {
                message.channel.send('I chose :raised_hand:\n**I win**!');
            } else if (input == "paper" && result[picker] == "scissors") {
                message.channel.send('I chose :v:\n**I win**!');
            }
            
            // If bot loses
            
            else if (input == "rock" && result[picker] == "scissors") {
                message.channel.send('I chose :v:\n**You win**!'); 
            } else if (input == "paper" && result[picker] == "rock") {
                message.channel.send('I chose :punch:\n**You win**!'); 
            } else if (input == "scissors" && result[picker] == "paper") {
                message.channel.send('I chose :raised_hand:\n**You win**!'); 
            }
            
        } else {
            const { prefix } = require('../config.json');
            message.channel.send(`**INVALID SYNTAX:** ${prefix}rps [rock/paper/scissors]`);
        }
	}
};