module.exports = {
	name: 'react',
	description: 'Reacts to a given message with the given emoji.',
	execute(message, args) {
        let id = args[0]
        let emoji = args[1];
        
        if (!id) {
            message.channel.send("You need to provide the ID of the message for me to react to it.");
        } else {
            if (!emoji) {
                message.channel.send("You didn't specify an emoji for me to react with. ");
            } else {
                message.channel.fetchMessage(id)
                .then(function (message) {
                    message.react(emoji);
                }) .catch(function(error) {
                    message.channel.send('Invalid message ID and/or emoji. Remember to use `:emoji:` instead of just `emoji`.');
                })       
            }
        }
	}
};