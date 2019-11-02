exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) return message.channel.send('You must mention someone or give their ID!')
  if (user.bot === true) return message.channel.send('Bots cannot receive money!')
  if (!args[1]) return message.channel.send('You need to specify a number to give.')
  if (message.mentions.users.first() === message.author) return message.channel.send('You cannot give yourself money.')
  const yourMoney = client.money.get(`${message.author.id}`, 'money')
  if (yourMoney < args[1]) return message.channel.send('You do not have enough money.')

  // Ensure this user has gotten rep before
  client.money.ensure(`${user.id}`, {
    user: user.id,
    money: 0
  })

  const money = client.money.get(`${user.id}`, 'money')
  client.money.set(`${user.id}`, parseInt(money) + parseInt(args[1]), 'money')
  client.money.set(`${message.author.id}`, yourMoney - args[1], 'money')
  message.channel.send(`You gave **${user.tag}** \`${args[1]}\`\n**${user.tag}'s balance:** $${parseInt(money) + parseInt(args[1])}\n**Your balance:** $${yourMoney - args[1]}`)
}

exports.conf = {
  enabled: true,
  aliases: ['give', 'givemoney', 'paymoney'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'pay',
  category: 'Economy',
  description: 'Pays <money> to <member>.',
  usage: 'pay <member> <money>'
}
