exports.run = async (client, message, args) => {
  client.life.ensure(message.author.id, {
    member: message.author.id,
    spouse: 0,
    job: 0
  })

  const spouse = client.life.get(message.author.id, 'spouse')
  if (spouse === 0) return message.channel.send('You need to have a spouse before you can divorce them.')

  if (args[0] === 'confirm') {
    message.channel.send('You divorced your partner.')
    client.life.set(message.author.id, 0, 'spouse')
    client.life.set(spouse, 0, 'spouse')
  }

  else {
  	message.channel.send('You are about to divorce your partner. Type ;;divorce confirm to confirm this action.')
  }
}

exports.conf = {
  enabled: true,
  aliases: ['div', 'fixyourlife'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'divorce',
  category: 'Fun',
  description: 'Divorces your spouse.',
  usage: 'divorce'
}
