const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const yesEmoji = message.client.emojis.get('568915076913037334')
  const noEmoji = message.client.emojis.get('568915333834866703')

  const settings = client.getSettings(message.guild.id)
  const input = message.content.split(`${settings.prefix}poll `)

  const embed = new Discord.RichEmbed()
    .setTitle('🗳 Poll')
    .setColor(colors.blue)
    .addField(input, `React with either ${yesEmoji} or ${noEmoji} to vote.`, true)
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
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'poll',
  category: 'Moderation',
  description: 'Creates a poll.',
  usage: 'poll <yes or no question>'
}
