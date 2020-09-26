const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    const member = message.mentions.members.first()
    let user = ''
    if (member) user = message.mentions.members.first().user
    if (user.bot === true) return message.channel.send('Now why would you want to do that?')
    if (!member) user = message.author

    client.life.ensure(user.id, {
      member: user.id,
      spouse: 0,
      job: 0
    })

    client.money.ensure(user.id, {
      member: user.id,
      money: 0
    })

    client.reputation.ensure(user.id, {
      member: user.id,
      reputation: 0
    })

    const married = client.life.get(user.id, 'spouse') === 0 ? 'nobody' : `<@${client.life.get(user.id, 'spouse')}>`

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}`)
      .addField(`ID`, user.id, true)
      .addField(`Account created:`, user.createdAt, true)
      .addField(`Status`, user.presence.status, true)
      .addField(`Married to`, married, true)
      .addField(`Reputation`, `+${client.reputation.get(user.id, 'reputation')}`, true)
      //.addField(`Job`, user.user, true)
      //.addField(`Achievements`, user.user, true)
      .setThumbnail(user.avatarURL)
      .setColor(colors.default)

    message.channel.send(embed)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['user', 'ui', 'i', 'whois'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'info',
  category: 'Utility',
  description: 'Returns info about the user.',
  usage: 'info'
}
