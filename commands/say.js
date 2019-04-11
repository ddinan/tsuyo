module.exports = {
	name: 'say',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
        const { no_perm_msg, mod_role, } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        
        String.prototype.replaceAll = function(target, replacement) {
            return this.split(target).join(replacement);
        }
        
        const text = args.slice(1).join(" ");
		const res = text.replaceAll(",", " ");
        let input = args.join(" ");
        
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { // If bot can't manage messages
            message.channel.send("I don't have the `MANAGE_MESSAGES` permission.");
        } else { // If bot can manage messages
            if (!modRole) { // If there is no CogentMod role
                message.channel.send(`There is no \`${mod_role}\` role.`);
            } else { // If there is a CogentMod role
                if (!message.member.roles.has(modRole.id)) { // If member doesn't have the CogentMod role
                    message.channel.send(no_perm_msg);
                } else { // If member has the CogentMod role
                    if (!input) { // If no input 
                        message.channel.send("You need to specify a message for me to say.");
                    } else { // If input 
                        message.delete();
                        message.channel.send(input);
                    }
                }
            }
        }
	},
};
