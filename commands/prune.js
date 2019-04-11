module.exports = {
	name: 'prune',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
        const { no_perm_msg, mod_role, } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { // If bot can't manage messages
            message.channel.send("I don't have the `MANAGE_MESSAGES` permission.");
        } else { // If bot can manage messages
            if (!modRole) { // If there is no CogentMod role
                message.channel.send(`There is no \`${mod_role}\` role.`);
            } else { // If there is a CogentMod role
                if (!message.member.roles.has(modRole.id)) { // If member doesn't have the CogentMod role
                    message.channel.send(no_perm_msg);
                } else { // If member has the CogentMod role
                    if (!args[0]) { // If number isn't specified
                        message.channel.send('You need to specify a number between 1 and 100.');
                    } else { // If number is specified
                        if (isNaN(amount)) { // If number isn't an integer (whole number)
                            message.channel.send(args[0] + " is not a valid integer.");
                        } else { // If number is an integer
                            if (amount < 1 || amount >= 101) { // If number isn't within 1 and 100
                                message.channel.send('You need to specify a number between 1 and 100.');
                            } else { // If number is within 1 and 100
                                message.channel.bulkDelete(amount, true).catch(err => {});
                            }
                        }
                    }
                }
            }
        }
	},
};
