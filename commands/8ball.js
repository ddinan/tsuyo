module.exports = {
	name: '8ball',
	description: 'Behold the magic 8ball.',
	execute(message, args) {
        const results = ['Yes.', 'No.', 'Maybe.'];
        const result = results[Math.floor(Math.random()*results.length)];
        const result2 = message.guild.members.random();
        let input = args.join(" ");
        
        if (!input) { 
            message.reply("you didn't ask me a question.");
        } 
        
        // Eventually the bot will be able to answer different questions. Not working as of now but at least the code below makes the bot respond when arguments are given. 
        
        if (input) {
            if (message.content.includes === 'will' || 'can' || 'have' || 'has' || 'did' || 'does' || 'do' || 'are' || 'is' || 'shall' ) {
		      return message.channel.send(result);
            } else if (message.content.includes === 'who' || 'whose' ) {
		      return message.channel.send(result2);
            }
        }
    }
};