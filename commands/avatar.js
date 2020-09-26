const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const embed = new Discord.MessageEmbed()
    .setColor(colors.default)
    .setImage(`${message.author.displayAvatarURL()}`)
    .addField('Your avatar:', `[Image URL](${message.author.displayAvatarURL()})`, true)

  if (!message.mentions.users.size) {
    return message.channel.send(embed)
  }

  const user = message.mentions.users.first() || message.author
  const embed2 = new Discord.MessageEmbed()
    .setColor(colors.default)
    .setImage(`${user.displayAvatarURL()}`)
    .setThumbnail(`${user.displayAvatarURL()}`)
    .addField(`${user.username}'s avatar:`, `${user.displayAvatarURL()}`, true)

  message.channel.send(embed2)
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'avatar',
  category: 'Utility',
  description: 'Returns either yours or [member]\'s avatar.',
  usage: 'avatar [member]'
}
