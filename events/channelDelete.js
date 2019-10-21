const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = (client, channel) => {
  let settings = client.getSettings(channel.guild.id);
  if (settings.logChannelUpdates == 'true') {
	const embed = new Discord.RichEmbed()
    .setAuthor("🗑️ Channel deleted")
    .setColor(colors.red)
    .setDescription(`Deleted channel \`${channel.name}\``)
    .setTimestamp();
		
	let modLogChannel = channel.guild.channels.find(c => c.name == settings.modLogChannel);
		
	modLogChannel.send(embed);
  }
};
