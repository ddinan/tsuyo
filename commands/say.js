module.exports = {
	name: 'say',
	description: 'Says given message as the bot.',
	execute(message, args) {
        const { no_perm_msg, mod_role, log_channel } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        
		String.prototype.replaceAll = function(target, replacement) {
            return this.split(target).join(replacement);
        }
        
        const text = args.slice(1).join(" ");
		const res = text.replaceAll(",", " ");
        let input = args.join(" ");
        
        if (!modRole)
        return message.reply(`there is no ${mod_role} role.`);

        if (!message.member.roles.has(modRole.id))
        return message.reply(no_perm_msg);
        
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
        return message.reply("");
        
        if (!input) { 
            message.reply("you need to specify a message for me to say.");
        } else {
            message.delete();
            message.channel.send(input);
        }
	},
};