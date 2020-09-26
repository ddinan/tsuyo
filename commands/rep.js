exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.cache.get(args[0])
  if (!user) return message.channel.send('You must mention someone or give their ID!')
  if (user.bot === true) return message.channel.send('Bots cannot receive rep!')

  if (user === message.author || message.author.id === user.id) return message.channel.send('You cannot give yourself +rep.')

  client.cooldown.ensure(`${message.author.id}`, {
    member: message.author.id,
    dailybonus: 0,
    rep: 0
  })

  const cooldown = client.cooldown.get(message.author.id, 'rep')

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  if (cooldown === date) return message.channel.send(`You can only give +rep every 24 hours.`)

  // Ensure this user has gotten rep before
  client.reputation.ensure(`${user.id}`, {
    user: user.id,
    rep: 0
  })

  const rep = client.reputation.get(`${user.id}`, 'reputation')

  client.reputation.set(`${user.id}`, rep + 1, 'reputation')
  message.channel.send(`You gave ${user.tag} +1rep.`)
  client.cooldown.set(`${message.author.id}`, date, 'rep') // Activate 24 hour cooldown
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
