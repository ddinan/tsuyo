const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'unmute',
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
                        message.channel.send("You need to mention a member to unmute.");
                    } else { // If a member is mentioned
                        if (!mutedRole) { // If there is no Muted role
                            message.channel.send(`There is no \`Muted\` role.`);
                        } else { // If there is a Muted role
                            const mentioned = message.mentions.members.first();
                            const embed = new Discord.RichEmbed()
                                .setAuthor("🔇 User unmuted")
                                .setColor(colors.blue)
                                .setDescription(`${args} was unmuted by ${message.author.username}.`)
                                .setTimestamp();
                            
                            if (mentioned.roles.has(mutedRole.id)) { // If member has the Muted role
                                if (message.guild.id === '263365621712945154') { // If message was typed in New Blood
                                    mentioned.addRole(verifiedRole).catch(console.error);
                                    mentioned.removeRole(mutedRole).catch(console.error);
                                    
                                    if (logs) { // If #logs exists
                                        logs.send(embed);
                                    }
                                    
                                    message.channel.send(`Successfully unmuted member.`);
                                    // message.mentions.member.send(`:mute: You have been unmuted in the **${message.guild.name}** Discord.`);
                                } else { // If message wasn't typed in New Blood
                                    mentioned.removeRole(mutedRole).catch(console.error);
                                    
                                    if (logs) { // If #logs exists
                                        logs.send(embed);
                                    }
                                    
                                    message.channel.send(`Successfully unmuted member.`);
                                    // message.mentions.members.send(`:mute: You have been unmuted in the **${message.guild.name}** Discord.`);
                                }
                            } else { // If member doesn't have the Muted role
                                message.channel.send(`Member isn't muted.`);
                            }
                        }
                    }
                }
            }
        }
	},
}