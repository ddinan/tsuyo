const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, channel) => {
  	const settings = client.getSettings(channel.guild.id)
  	if (settings.logChannelUpdates == 'true') {
    if (settings.modLogChannel && channel.guild.channels.find(c => c.name == settings.modLogChannel)) {
      const modLogChannel = channel.guild.channels.find(c => c.name == settings.modLogChannel)
      if (!modLogChannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return
      if (!modLogChannel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return

      const embed = new Discord.MessageEmbed()
        .setAuthor('🗑️ Channel deleted')
        .setColor(colors.red)
        .setDescription(`Deleted channel \`${channel.name}\``)
        .setTimestamp()

      modLogChannel.send(embed)
    }
  	}
}
