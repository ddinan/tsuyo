const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = (client, member) => {
 	let settings = client.getSettings(member.guild.id);
 	if (settings.welcomeEnabled !== 'true') return;
 	let welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user.tag).replace('{{ping}}', '<@' + member.user.id + '>');
  
 	/* TODO: Welcome messages using Canvas
 	if (settings.welcomeMessage && member.guild.channels.find(c => c.name == settings.welcomeChannel)) {
	 	member.guild.channels.find(c => c.name == settings.welcomeChannel).send(welcomeMessage).catch();
 	} */
	
	if (settings.logMessageUpdates === 'true') {
		if (settings.modLogChannel && member.guild.channels.find(c => c.name == settings.modLogChannel)) {
			let modLogChannel = member.guild.channels.find(c => c.name === settings.modLogChannel);
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
