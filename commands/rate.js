module.exports = {
	name: 'rate',
	description: 'Reacts with a thumbs up/thumbs down emoji.',
	execute(message) {
		message.react("👍")
		message.react("👎")
	},
};