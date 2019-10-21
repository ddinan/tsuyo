const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = (client, member) => {
  let settings = client.getSettings(member.guild.id);
  if (settings.logMessageUpdates == 'true') {
	const embed = new Discord.RichEmbed()
	.setAuthor("❌ Member left")
	.setColor(colors.red)
	.setDescription(`**Total member count:** \`${member.guild.memberCount}\`\n<@${member.user.id}> left the Discord.`)
	.setThumbnail(`${member.user.displayAvatarURL}`)
	.setTimestamp();
		
	let modLogChannel = member.guild.channels.find(c => c.name == settings.modLogChannel);
		
	modLogChannel.send(embed);
  }
};
