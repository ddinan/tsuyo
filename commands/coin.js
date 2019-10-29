exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const sides = ['heads', 'tails']
  const side = sides[Math.floor(Math.random() * sides.length)]
  message.channel.send('The coin landed on ' + side + '.')
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'coin',
  category: 'Utility',
  description: 'Flips a coin.',
  usage: 'coin'
}
