module.exports = {
	name: 'afk',
	description: 'Toggles the [AFK] tag beside your name.',
	execute(message) {
        const nick = message.member.displayName;
        message.member.setNickname(`[AFK] ${nick}`)
		message.channel.send('Boop.');
	},
};