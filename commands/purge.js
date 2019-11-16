exports.run = async (client, message, args, level) => {
  try {
    let num

    if (!isNaN(args[0])) {
      num = parseInt(args[0])

      if (num <= 100 && num > 1) {
        message.delete()
        message.channel.bulkDelete(num)
      } else message.reply('You must enter a number between 2 and 100 for me to clear!')
    } else {
      message.reply('You must enter a number between 2 and 100 for me to clear!')
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['clear', 'prune', 'delete', 'del'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'purge',
  category: 'Moderation',
  description: 'Purges the amount of messages you specify.',
  usage: 'purge <2-100>'
}
