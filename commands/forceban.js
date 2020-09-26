const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  try {
    const user = args[0]
    const settings = client.getSettings(message.guild.id)

    if (user) {
      message.guild.members.ban(user).then(() => {
        message.reply('Successfully banned the user!')

        const modLogChannel = settings.modLogChannel
        if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
          const embed = new Discord.MessageEmbed()
            .setTitle('User Banned')
            .setColor(colors.default)
            .setDescription(`Name: ${user.username}\nID: ${args[0]}\nReason: ${args.slice(1).join(' ')}\nModerator: ${message.author.username}`)

          message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed)
        }
      }).catch(err => {
        message.reply('I was unable to ban the user.')
      })
    } else message.channel.send("You didn't provide a valid UserID!")
  } catch (err) {
    message.channel.send('There was an error!\n' + err + '').catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['fb'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'forceban',
  category: 'Moderation',
  description: 'Bans a member not in your server.',
  usage: 'forceban <userID> [reason]'
}
