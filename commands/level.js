exports.run = async (client, message, args, level) => {
  try {
    const friendly = client.config.permLevels.find(l => l.level === level).name
    message.reply(`your permission level is ${level} (${friendly}).`)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['perms'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'level',
  category: 'Utility',
  description: 'Returns your permission level.',
  usage: 'level'
}
