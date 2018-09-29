const sides = ['heads', 'tails'];

module.exports = {
	name: 'coin',
	description: 'Flips a coin and saves you the hassle of going into your wallet.',
	execute(message) {
		const side = sides[Math.floor(Math.random()*sides.length)];
		message.channel.send("The coin landed on " + side + ".");
	},
};