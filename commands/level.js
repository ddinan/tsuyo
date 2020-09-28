exports.run = async (client, message, args, level) => {
  try {
    const friendly = client.config.permLevels.find(l => l.level === level).name
    message.channel.send(`Your permission level is ${level} (${friendly}).`)
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();
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
