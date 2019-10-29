exports.run = async (client, message, args, level) => {
  try {
    let sts

    client.money.ensure(message.author.id, {
      money: 0,
      stone: 250
    })

    const stone = client.money.get(message.author.id, 'stone')
    const money = client.money.get(message.author.id, 'money')

    if (args[0]) {
      if (client.money.get(message.author.id, 'stone') < Number(args[0])) return message.reply('You dont have enough stone to sell!')
      else sts = Number(args[0])
    } else sts = client.money.get(message.author.id, 'stone')

    client.money.set(message.author.id, stone - sts, 'stone')
    client.money.set(message.author.id, money + Math.round(sts), 'money')

    message.channel.send('You now have $' + client.money.get(message.author.id, 'money') + '!')
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'sell',
  category: 'Economy',
  description: 'Sells stone',
  usage: 'sell [amount of stone]'
}
