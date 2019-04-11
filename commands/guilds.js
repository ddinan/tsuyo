module.exports = {
	name: 'guilds',
	execute(message, args) {
        var list = message.client.guilds.array();
        if (message.author.id === "191517443519152129") {
            message.channel.send(list);
        } else {
            message.channel.send("You're not the bot owner.");
        }
    },
};