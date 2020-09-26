const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const yesEmoji = '✅'
  const noEmoji = message.client.emojis.cache.get('637573919204966410')
  const settings = client.getSettings(message.guild.id)

  if (args.length === 0) {
    return message.channel.send(`You need to specify either add, accept or deny.`)
  }

	if (args[0] === "add") {
		if (message.member.roles.cache.some(r => r.name === settings.modRole) || message.member.roles.cache.some(r => r.name === settings.adminRole)) {
			if (args.length === 1) return message.channel.send(`You need to specify the contents of the suggestion.\nE.g, \`${settings.prefix}suggestions add Better syntax descriptions.\``)

			const input = message.content.startsWith(`${settings.prefix}sg add`) ? message.content.split(`${settings.prefix}sg add `) : message.content.split(`${settings.prefix}suggestions add`)

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor(colors.default)
				.setDescription(input)
				.setTimestamp()
				.setFooter(`Generating ID...`)

			const newMsg = await message.channel.send(embed)

			const newEmbed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor(colors.default)
				.setDescription(input)
				.setTimestamp()
				.setFooter(`ID: ${newMsg.id}`)

			newMsg.edit(newEmbed).then(() => {
				message.delete()
				newMsg.react(yesEmoji).then(() => {
					newMsg.react(noEmoji)
					return
				})
			})
		} else { return message.channel.send("You do not have permission to use this command.") }
	}

	if (args[0] === "delete" || args[0] === "del" || args[0] === "deny" || args[0] === "decline") {
		if (message.member.roles.cache.some(r => r.name === settings.adminRole)) {
			if (args.length === 1) return message.channel.send('You need to specify a suggestion to deny.')

			if (settings.deniedChannel && message.channel.guild.channels.find(c => c.name == settings.deniedChannel)) {
				const deniedChannel = message.channel.guild.channels.find(c => c.name == settings.deniedChannel)

				message.channel.fetchMessage(args[1])
					.then(suggestion => {
						const embed = suggestion.embeds[0];
						const newEmbed = new Discord.MessageEmbed(embed)
							.setColor(colors.red)
							.setTimestamp()
							.setFooter(`ID: ${args[1]}`)

						deniedChannel.send(newEmbed)
						suggestion.delete()
						message.delete()
						return
					}).catch()
			}
		}

		else { return message.channel.send("You do not have permission to use this command.") }
	}

	if (args[0] === "accept") {
		if (message.member.roles.cache.some(r => r.name === settings.adminRole)) {
			if (args.length === 1) return message.channel.send('You need to specify a suggestion to accept.')

			if (settings.acceptedChannel && message.channel.guild.channels.find(c => c.name == settings.acceptedChannel)) {
				const acceptedChannel = message.channel.guild.channels.find(c => c.name == settings.acceptedChannel)

				message.channel.fetchMessage(args[1])
					.then(suggestion => {
						const embed = suggestion.embeds[0];
						const newEmbed = new Discord.MessageEmbed(embed)
							.setColor(colors.green)
							.setTimestamp()
							.setFooter(`ID: ${args[1]}`)

						acceptedChannel.send(newEmbed)
						suggestion.delete()
						message.delete()
						return
					}).catch()
			}
		}

		else { return message.channel.send("You do not have permission to use this command.") }
	}
}

exports.conf = {
  enabled: true,
  aliases: ['sg'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'suggestions',
  category: 'Moderation',
  description: 'Suggestions system.',
  usage: 'suggestions <add/accept/deny>'
}
