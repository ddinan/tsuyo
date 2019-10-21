const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = (client, message) => {
  if (message.author.bot) return;
  
  let settings = client.getSettings(message.guild.id);
  if (settings.logMessageUpdates == 'true') {
    let embed = new Discord.RichEmbed()
    .setAuthor("🗑️ Message deleted")
    .setColor(colors.teal)
    .setDescription(`Message deleted by <@${message.author.id}> in ${message.channel}`)
	.addField(`Message:`, `${message}`)
    .setTimestamp();

    if (message.guild.channels.find(channel => channel.name == settings.modLogChannel)) {
      message.guild.channels.find(channel => channel.name == settings.modLogChannel).send(embed).catch();
    }
  }
};
