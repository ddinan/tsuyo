/* To do:
    - Create invites to join the servers if bot has permission
    - Display invite next to name
*/

module.exports = {
	name: 'guilds',
	execute(message, args) {
        var list = message.client.guilds.array();
        if (message.author.id === "191517443519152129" || message.author.id === "320076807929987073") {
            message.author.send(list);
            message.channel.send("A list of guilds was sent to your inbox.");
        } else {
            message.channel.send("You're not a bot developer");
        }
    },
};