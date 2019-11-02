exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send('You have to input the HEX code!')

    const hex = args.join(' ').replace('#', '')
    const r = Number(hex.substring(0, 2))
    const g = parseInt(hex.substring(2, 4))
    const b = parseInt(hex.substring(4, 6))

    message.channel.send('RGB Color Code: rgb(' + r + ', ' + g + ', ' + b + ')')
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'hextorgb',
  category: 'Utility',
  description: 'Converts HEX to RGB',
  usage: 'hextorgb <value>'
}
