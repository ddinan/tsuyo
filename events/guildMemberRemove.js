const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, member) => {
 	const settings = client.getSettings(member.guild.id)
 	if (settings.logMessageUpdates === 'true') {
    if (settings.modLogChannel && member.guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
      const modLogChannel = member.guild.channels.cache.find(c => c.name == settings.modLogChannel)
      if (!modLogChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
      if (!modLogChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

      const embed = new Discord.MessageEmbed()
        .setAuthor('📤 Member left')
        .setColor(colors.red)
        .setDescription(`**Total member count:** \`${member.guild.memberCount}\`\n<@${member.user.id}> left the Discord.`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .setTimestamp()

      modLogChannel.send(embed)
    }
  }
}
