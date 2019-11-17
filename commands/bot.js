const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const moment = require('moment')
const version = require('discord.js')
require('moment-duration-format')

exports.run = (client, message, args, level) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
  const embed = new Discord.RichEmbed()
    .setAuthor('Bot Information')
    .setColor(colors.default)
    .setThumbnail(client.user.avatarURL)
    .addField('Total guilds:', message.client.guilds.size, true)
    .addField('Total members:', `${message.client.users.size}`, true)
    .addField('ID', `${message.client.user.id}`, true)
    .addField('Hosted in', ':flag_lt: Lithuania', true)
    .addField('Uptime', `${duration}`, true)
    .addField('Created by', '<@191517443519152129>', true)
    .addField('Support server', '[Click here](https://discord.gg/3hbeQgY)')
    .setTimestamp()
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['botinfo'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'bot',
  category: 'Utility',
  description: 'Displays information about the bot',
  usage: 'bot'
}
