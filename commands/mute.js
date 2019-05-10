const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'mute',
	execute(message, args) {
        const { no_perm_msg, mod_role, log_channel } = require('../config.json');
		const modRole = message.guild.roles.find(role => role.name === mod_role);
        const mutedRole = message.guild.roles.find(role => role.name === "Muted");
        const verifiedRole = message.guild.roles.find(role => role.name === "Verified"); // New Blood exclusive
        const logs = message.guild.channels.find(logs => logs.name === log_channel);

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) { // If bot can't manage messages
            message.channel.send("I don't have the `MANAGE_ROLES` permission.");
        } else { // If bot can manage messages
            if (!modRole) { // If there is no CogentMod role
                message.channel.send(`There is no \`${mod_role}\` role.`);
            } else { // If there is a CogentMod role
                if (!message.member.roles.has(modRole.id)) { // If member doesn't have the CogentMod role
                    message.channel.send(no_perm_msg);
                } else { // If member has the CogentMod role
                    if (message.mentions.members.size === 0) { // If no member is mentioned 
                        message.channel.send("You need to mention a member to mute.");
                    } else { // If a member is mentioned
                        if (!mutedRole) { // If there is no Muted role
                            message.channel.send(`There is no \`Muted\` role.`);
                        } else { // If there is a Muted role
                            const mentioned = message.mentions.members.first();
                            if (mentioned.roles.has(mutedRole.id)) { // If member has the Muted role
                                message.channel.send(`Member is already muted.`);
                            } else { // If member doesn't have the Muted role
                                
                                const embed = new Discord.RichEmbed()
                                .setAuthor("🔇 User muted")
                                .setColor(colors.blue)
                                .setDescription(`${args} was muted by ${message.author.username}.`)
                                .setTimestamp();
                                
                                if (message.guild.id === '263365621712945154') { // If message was typed in New Blood
                                    mentioned.addRole(mutedRole).catch(console.error);
                                    mentioned.removeRole(verifiedRole).catch(console.error);
                                    
                                    if (logs) { // If #logs exists
                                        logs.send(embed);
                                    }
                                    
                                    message.channel.send(`Successfully muted member.`);
                                    // message.mentions.members.send(`:mute: You have been muted in the **${message.guild.name}** Discord.`);
                                } else { // If message wasn't typed in New Blood
                                    mentioned.addRole(mutedRole).catch(console.error);
                                    
                                    if (logs) { // If #logs exists
                                        logs.send(embed);
                                    }
                                    
                                    message.channel.send(`Successfully muted member.`);
                                    // message.mentions.members.first(`:mute: You have been muted in the **${message.guild.name}** Discord.`);
                                }
                            }
                        }
                    }
                }
            }
        }
	},
}