exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const download = require('download-github-repo')
  download("venksociety/tsuyo")
  message.channel.send('Successfully updated to latest commit.')
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'Bot Developer'
}

exports.help = {
  name: 'update',
  category: 'Utility',
  description: 'Updates the bot to the latest commit on the GitHub repository.',
  usage: 'update'
}
