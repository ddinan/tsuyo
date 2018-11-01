module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
        const { no_perm_msg, mod_role, log_channel } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        
        if (!modRole)
            return message.reply(`there is no ${mod_role} role.`);

            if (!message.member.roles.has(modRole.id))
            return message.reply(no_perm_msg);
        
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
            return message.reply("");

		if (isNaN(amount)) {
			return message.reply('invalid syntax. Try /prune [1-99].');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel.');
		});
	},
};
