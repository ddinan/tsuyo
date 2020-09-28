exports.run = async (client, message, args, level) => {
  try {
    message.delete().catch()
    const mg = args.join(' ')
    message.channel.send(mg)
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();  
  }
}

exports.conf = {
  enabled: true,
  aliases: ['rep'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'say',
  category: 'Moderation',
  description: 'Returns the text you provide.',
  usage: 'say <text>'
}
