const ms = require('ms')
const got = require(`got`)
const request = require('request')
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
  const lavender = '#9873AC'
  if (!args[0]) return message.channel.send('You need to specify either info, server or skin.')

  if (args[0] === "info" || args[0] === "i" || args[0] === "whois") {
    if (!args[1]) {
      return message.channel.send(`You need to specify a username to get information about.\nE.g, \`;;info Venk\``)
    }

        request(`https://www.classicube.net/api/player/${args[1]}`, function(error, body) {
			var result = JSON.parse(body.body)
			if (!result || result.username === null) return message.channel.send(`\`${args[1]}\` is not a registered user.`)

			const embed = new Discord.MessageEmbed()
			.setTitle(result.username)
			.setColor(lavender)
			.setThumbnail(`https://www.classicube.net/face/${result.username}.png`)
			.addField('ID', result.id, true)
			.addField('Premium', result.premium, true)

			message.channel.send(embed)
		})
	}

	if (args[0] === "server") {
	}

	if (args[0] === "skin") {
		if (args.length === 1) return message.channel.send(`You need to specify a username to get the skin of\nE.g, \`!info Venk\` \nYou can also use +name to get the Minecraft skin.`)

		if (args[1].startsWith('+')) {
			const skin = args[1].replace('+', '')
			const mEmbed = new Discord.MessageEmbed()
			.setAuthor(skin + `'s skin`)
			.setTitle('Skin URL')
			.setURL(`https://minotar.net/skin/${skin}.png`)
			.setColor('#3BCE3B')
			.setImage(`https://minotar.net/skin/${skin}.png`)

			message.channel.send(mEmbed)
		} else {

			request(`https://www.classicube.net/api/player/${args[1]}`, function(error, body) {
				var result = JSON.parse(body.body)
				if (!result || result.username === null) return message.channel.send(`\`${args[1]}\` is not a registered user.`)

				const embed = new Discord.MessageEmbed()
				.setAuthor(result.username + `'s skin`)
				.setTitle('Skin URL')
				.setURL(`https://www.classicube.net/skins/${result.username}.png`)
				.setColor(lavender)
				.setImage(`https://www.classicube.net/skins/${result.username}.png`)

				message.channel.send(embed)
			})
		}
	}
}

exports.conf = {
  enabled: true,
  aliases: ['cc'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'classicube',
  category: 'Utility',
  description: 'Claim your daily bonus every 24 hours.',
  usage: 'classicube <info/server/skin> <name>'
}
