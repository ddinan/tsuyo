module.exports = {
	name: 'kick',
	execute(message, args) {
        const { no_perm_msg, mod_role, log_channel } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        const kickMember = message.mentions.members.first();
        const channel = message.guild.channels.find(channel => channel.name === log_channel);
        
        
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) { // If bot can't manage messages
            message.channel.send("I don't have the `KICK_MEMBERS` permission.");
        } else { // If bot can manage messages
            if (!modRole) { // If there is no CogentMod role
                message.channel.send(`There is no \`${mod_role}\` role.`);
            } else { // If there is a CogentMod role
                if (!message.member.roles.has(modRole.id)) { // If member doesn't have the CogentMod role
                    message.channel.send(no_perm_msg);
                } else { // If member has the CogentMod role
                    if (message.mentions.members.size === 0) { // If no member is mentioned 
                        message.channel.send("You need to mention a member to kick.");
                    } else { // If a member is mentioned
                        kickMember.kick(args.join(" ")).then(member => { // What happens after user is kicked // 
                            message.channel.send(`Successfully kicked member \`${member.user.username}\` from the guild.`);

                            if (channel) { // If logs channel exists
                                channel.send(`:x: ${member.user.username} was kicked from the Discord. Total member count: **${message.guild.memberCount}**`); 
                            }
                        })
                        .catch(err => {
                            message.channel.send("I can't kick that person.");
                        });
                    }
                }
            }
        }
	},
}