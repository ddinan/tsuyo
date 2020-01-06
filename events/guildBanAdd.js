const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, guild, user) => {
  const settings = client.getSettings(guild.id)
  const modLogChannel guild.channels.find(c => c.name === settings.modLogChannel)
  
  if (message.author.bot) return
  if (message.guild === null) return

  if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && message.guild.channels.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = message.guild.channels.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return

	  const embed = new Discord.RichEmbed()
        .setTitle('🔨 Member banned')
        .setColor(colors.red)
        .setDescription(`**Total member count:** \`${member.guild.memberCount}\`\n<@${user.id}> was banned from the Discord.`)
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp()

		modLogChannel.send(embed)
	}
}
