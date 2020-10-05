exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    const download = require('download-github-repo')
    download("venksociety/tsuyo")
    message.channel.send('Successfully updated to latest commit.')
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();
  }
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
