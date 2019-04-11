/* To do:
    - Migrate all role commands into one big /role command and use args. E.g, /role add or /role delete
    - Log role creation/deletion in logs channel
*/

module.exports = {
	name: 'addrole',
	execute(message, args) {
		const roleName = args[0];
        const { no_perm_msg, mod_role } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        const canDo = false;
        
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) { // If bot can't manage roles
            message.channel.send("I don't have the `MANAGE_ROLES` permission.");
        } else { // If bot can manage roles
            if (!modRole) { // If there is no CogentMod role
                message.channel.send(`There is no \`${mod_role}\` role.`);
            } else { // If there is a CogentMod role
                if (!message.member.roles.has(modRole.id)) { // If member doesn't have the CogentMod role
                    message.channel.send(no_perm_msg);
                } else { // If member has the CogentMod role
                    if (!args[0]) { // If role isn't specified
                        message.channel.send('You need to specify a role name.');
                    } else { // If role is specified
                        if (args[1]) { // If hex value is specified
                            if (args[1].startsWith('#')) { // If hex value starts with a hashtag
                                const isHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(args[1]); // Check if valid hex value
                            
                                if (isHex === true) { // If valid hex value
                                    message.guild.createRole({
                                        name: args[0],
                                        color: args[1]
                                    });

                                    message.channel.send(`Successfully created role \`${args[0]}\`.`);
                                } else { // If invalid hex value
                                    message.channel.send(`\`${args[1]}\` is not a valid hex value.`);
                                }
                            } else { // If hex value doesn't start with a hashtag
                                const ifNoHashtag = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(args[1]); // Check if valid hex value
                                
                                if (ifNoHashtag === true) { // If valid hex value
                                    message.guild.createRole({
                                        name: args[0],
                                        color: args[1]
                                    });

                                    message.channel.send(`Successfully created role \`${args[0]}\`.`);
                                } else { // If invalid hex value
                                    message.channel.send(`\`${args[1]}\` is not a valid hex value.`);
                                }
                            }
                        } else { // If hex value isn't specified
                            message.guild.createRole({
                                name: args[0]
                            });
                            
                            message.channel.send(`Successfully created role \`${args[0]}\`.`);
                        }
                    }
                }
            }
        }
	},
};
