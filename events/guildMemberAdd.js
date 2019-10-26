const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = (client, member) => {
 	let settings = client.getSettings(member.guild.id);
 	if (settings.welcomeEnabled !== 'true') return;
	
	let welcomeChannel = member.guild.channels.find(c => c.name == settings.welcomeChannel);
  
 	if (settings.welcomeMessage && welcomeChannel) {
		if (!welcomeChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return;
		if (!welcomeChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return;

		// TODO: Better way of doing this
		if (settings.welcomeMessage.includes('{{name}}')) { // If includes {{name}}
			if (settings.welcomeMessage.includes('{{mention}}')) { // If includes {{name}} and {{mention}}
				if (settings.welcomeMessage.includes('{{members}}')) { // If includes {{name}}, {{mention}} and {{members}}
					let welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount);
					welcomeChannel.send(welcomeMessage);
				}
				
				else {
					let welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>');
					welcomeChannel.send(welcomeMessage);
				}
			}
			
			else {
				let welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount);
				welcomeChannel.send(welcomeMessage);
			}
		}
		
		else {
			if (settings.welcomeMessage.includes('{{mention}}')) { // If includes {{mention}}
				if (settings.welcomeMessage.includes('{{members}}')) { // If includes {{mention}} and {{members}}
					let welcomeMessage = settings.welcomeMessage.replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount);
					welcomeChannel.send(welcomeMessage);
				}
				
				else {
					let welcomeMessage = settings.welcomeMessage.replace('{{mention}}', '<@' + member.user.id + '>');
					welcomeChannel.send(welcomeMessage);
				}
			}
			
			else {
				if (settings.welcomeMessage.includes('{{members}}')) { // If includes {{members}}
					let welcomeMessage = settings.welcomeMessage.replace('{{members}}', member.guild.memberCount);
					welcomeChannel.send(welcomeMessage);
				}
				
				else { // If doesn't contain any variables
					welcomeChannel.send(settings.welcomeMessage);
				}
			}
		}
	}
	
	if (settings.logMessageUpdates === 'true') {
		let modLogChannel = member.guild.channels.find(c => c.name === settings.modLogChannel);
		if (settings.modLogChannel && modLogChannel) {
	 		if (!modLogChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return;
			if (!modLogChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return;

			const embed = new Discord.RichEmbed()
			.setAuthor("✔️ Member joined")
			.setColor(colors.green)
			.setDescription(`**Total member count:** \`${member.guild.memberCount}\`\n<@${member.user.id}> joined the Discord.`)
			.setThumbnail(`${member.user.displayAvatarURL}`)
			.setTimestamp();

			modLogChannel.send(embed);
 		}
	}
};
