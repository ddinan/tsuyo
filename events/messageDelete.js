const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, message) => {
  	if (message.author.bot) return
    if (message.guild === null) return

  	const settings = client.getSettings(message.guild.id)
  	if (settings.logMessageUpdates == 'true') {
			if (settings.modLogChannel && message.guild.channels.find(c => c.name == settings.modLogChannel)) {
				const modLogChannel = message.guild.channels.find(c => c.name == settings.modLogChannel)
				if (!modLogChannel.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
				if (!modLogChannel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return

				const embed = new Discord.MessageEmbed()
					.setAuthor('🗑️ Message deleted')
					.setColor(colors.default)
					.setDescription(`Message deleted by <@${message.author.id}> in ${message.channel}`)
					.addField('Message:', `${message}`)
					.setTimestamp()

				modLogChannel.send(embed)
			}
  	}
}
