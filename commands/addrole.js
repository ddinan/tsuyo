module.exports = {
	name: 'addrole',
	description: 'Creates a new role.',
	execute(message, args) {
        const { no_perm_msg, mod_role, log_channel } = require('../config.json');
        const modRole = message.guild.roles.find(role => role.name === mod_role);
        let input = args.join(" ");
        
        if (!modRole)
            return message.reply(`there is no ${mod_role} role.`);

            if (!message.member.roles.has(modRole.id))
            return message.reply(no_perm_msg);
        
        if (!message.guild.me.hasPermission("MANAGE_ROLES"))
            return message.reply("");
        
        if (!input) { 
            message.reply("you need to specify a role name.");
        } else {
        message.guild.createRole({
            name: input });
        message.channel.send(`Successfully created role **${input}**.`);
        }
    },
};