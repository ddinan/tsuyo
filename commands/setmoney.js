exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) return message.channel.send('You must mention someone or give their ID!')
  if (user.bot === true) return message.channel.send('Bots cannot receive money!')
  if (!args[1]) return message.channel.send('You need to specify a number to give.')
  if (isNaN(args[1])) return message.channel.send('Invalid amount.')

  client.money.ensure(`${user.id}`, {
    user: user.id,
    money: 0
  })

  const money = client.money.get(`${user.id}`, 'money')
  client.money.set(`${user.id}`, parseInt(args[1]), 'money')
  message.channel.send(`You gave **${user.tag}** \`${args[1]}\`\n**${user.tag}'s balance:** $${parseInt(args[1])}`)
}

exports.conf = {
  enabled: true,
  aliases: ['sm'],
  guildOnly: true,
  permLevel: 'Bot Moderator'
}

exports.help = {
  name: 'setmoney',
  category: 'Developer',
  description: 'Pays <money> to <member>.',
  usage: 'setmoney <member> <money>'
}
