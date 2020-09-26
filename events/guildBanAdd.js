const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, guild, user) => {
  const settings = client.getSettings(guild.id)
  const modLogChannel = guild.channels.cache.find(c => c.name === settings.modLogChannel)

  if (guild === null) return

  if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = guild.channels.cache.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

	  const embed = new Discord.MessageEmbed()
        .setTitle('🔨 Member banned')
        .setColor(colors.red)
        .setDescription(`**Total member count:** \`${guild.memberCount}\`\n<@${user.id}> was banned from the Discord.`)
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp()

		modLogChannel.send(embed)
    }
  }
}
