exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args[0] === 'give') {
    // Limited to guild owner
    if (message.author.id !== message.guild.ownerID) { return message.reply("You're not the boss of me, you can't do that!") }

    const user = message.mentions.users.first() || client.users.get(args[0])
    if (!user) return message.reply('You must mention someone or give their ID!')

    const pointsToAdd = parseInt(args[2], 10)
    if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    })

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, 'points')
    userPoints += pointsToAdd

    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, 'points')

    message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`)
    return
  }

  if (args[0] === 'take') {
    // Limited to guild owner
    if (message.author.id !== message.guild.ownerID) { return message.reply("You're not the boss of me, you can't do that!") }

    const user = message.mentions.users.first() || client.users.get(args[0])
    if (!user) return message.reply('You must mention someone or give their ID!')

    const pointsToTake = parseInt(args[2], 10)
    if (!pointsToTake) return message.reply("You didn't tell me how many points to take...")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    })

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, 'points')
    userPoints -= pointsToTake

    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, 'points')

    message.channel.send(`${user.tag} has lost ${pointsToTake} points and now stands at ${userPoints} points.`)
    return
  }

  const key = `${message.guild.id}-${message.author.id}`
  const xp = client.points.get(key, 'points')
  const level = client.points.get(key, 'level')
  const number = ((5 * (level + 1)) ** 2) - xp

  message.channel.send(`You currently have ${xp}XP, and are level ${level}!`)
  message.channel.send(`You need ${number}XP to level up to ${level + 1}`)
}

exports.conf = {
  enabled: true,
  aliases: ['shop'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'xp',
  category: 'Economy',
  description: 'Shows your XP/level for this Discord.',
  usage: 'xp'
}
