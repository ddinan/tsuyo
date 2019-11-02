exports.run = async (client, message, args) => {
  const key = `${message.author.id}`

  client.money.ensure(`${message.author.id}`, {
    member: message.author.id,
    money: 0
  })

  const money = client.money.get(key, 'money')

  message.channel.send(`You currently have $${money}.`)
}

exports.conf = {
  enabled: true,
  aliases: ['bal', 'balance', '$', 'wallet'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'money',
  category: 'Economy',
  description: 'Shows your money.',
  usage: 'money'
}
