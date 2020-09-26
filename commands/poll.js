const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const yesEmoji = '✅'
  const noEmoji = message.client.emojis.cache.get('637573919204966410')
  const settings = client.getSettings(message.guild.id)
  const input = message.content.split(`${settings.prefix}poll `)

  const embed = new Discord.MessageEmbed()
    .setTitle('🗳 Poll')
    .setColor(colors.default)
    .addField(`React with either ✅ or ${noEmoji} to vote.`, input, true)
    .setTimestamp()

  if (args.length === 0) {
    message.channel.send(`You need to specify the contents of the poll.\nE.g, \`${settings.prefix}poll Does pineapple belong on pizza?\``)
  } else {
    message.delete()
    message.channel.send(embed).then(message => {
      message.react(yesEmoji)
        .then(() => message.react(noEmoji))
    })
  }
}

exports.conf = {
  enabled: true,
  aliases: ['ask'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'poll',
  category: 'Moderation',
  description: 'Starts a poll.',
  usage: 'poll <question>'
}
