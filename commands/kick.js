module.exports = {
	name: 'kick',
	description: 'Kicks the specified user.',
	execute(message, args) {
        const { no_perm_msg, mod_role, log_channel } = require('../config.json');
		const modRole = message.guild.roles.find("name", (mod_role));

        if (!modRole)
        return message.reply(`There is no ${mod_role} role.`);

        if (!message.member.roles.has(modRole.id))
        return message.reply(no_perm_msg);

        if (message.mentions.members.size === 0)
        return message.reply("please mention a user to kick.");

        if (!message.guild.me.hasPermission("KICK_MEMBERS"))
        return message.reply("");

        const kickMember = message.mentions.members.first();

        kickMember.kick(args.join(" ")).then(member => {
            
        // What happens after user is kicked // 
            
        message.reply(`${member.user.username} was succesfully kicked.`);
            
        const channel = member.guild.channels.find('name', (log_channel));
        if (!channel) return;
        channel.send(`:x: ${member.user.username} was kicked from the Discord. Total member count: **${message.guild.memberCount}**`);
        });
	},
};