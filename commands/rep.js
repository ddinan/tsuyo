exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) return message.reply('You must mention someone or give their ID!')

  if (message.mentions.users.first() === message.author) return message.reply('You cannot give yourself +rep.')

  // Ensure this user has gotten rep before
  client.reputation.ensure(`${user.id}`, {
    user: user.id,
    rep: 0
  })

  const rep = client.reputation.get(`${user.id}`, 'reputation')

  client.reputation.set(`${user.id}`, rep + 1, 'reputation')

  message.channel.send(`You gave ${user.tag} +1rep.`)
}

exports.conf = {
  enabled: true,
  aliases: ['+rep', 'giverep', 'repgive'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'rep',
  category: 'Economy',
  description: 'Gives +1 rep to <member>.',
  usage: 'rep <member>'
}
