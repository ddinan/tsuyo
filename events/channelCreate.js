const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, channel) => {
  if (channel.type == "dm") return
  	const settings = client.getSettings(channel.guild.id)
  	if (settings.logChannelUpdates == 'true') {
      if (settings.modLogChannel && channel.guild.channels.find(c => c.name == settings.modLogChannel)) {
      const modLogChannel = channel.guild.channels.find(c => c.name == settings.modLogChannel)
      if (!modLogChannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return
      if (!modLogChannel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return
      const embed = new Discord.MessageEmbed()
        .setAuthor('🔨 Channel created')
        .setColor(colors.green)
        .setDescription(`Created channel ${channel}`)
        .setTimestamp()

      modLogChannel.send(embed)
    }
  }
}
