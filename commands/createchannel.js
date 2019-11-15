exports.run = async (client, message, args, level) => {
  try {
    if (!args[1]) return message.reply('You need to give me the channel type!')
    if (!args[0]) return message.reply('You need to give me the channel name!')

    message.channel.send('I\'ve created the channel!').then(() => {
      message.guild.createChannel(args[1], args[0], []).catch((err) => {
        message.channel.send('There was an error!')
      })
    })
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['crc', 'chanmake'],
  guildOnly: true,
  permLevel: 'Administrator'
}

exports.help = {
  name: 'createchannel',
  category: 'Moderation',
  description: 'Creates a channel in the server.',
  usage: 'createchannel <voice/text> <name>'
}
