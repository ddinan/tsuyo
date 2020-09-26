const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first()
    const settings = client.getSettings(message.guild.id)

    if (user) {
      const member = message.guild.member(user)
      if (member) {
        member.ban(args.slice(1).join(' ')).then(() => {
          message.reply('Successfully banned ${user.tag}!')

          const modLogChannel = settings.modLogChannel
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            const embed = new Discord.MessageEmbed()
              .setTitle('User Ban')
              .setColor('#eeeeee')
              .setDescription(`Name: ${user.username}\nID: ${user.id}\nReason: ${args.slice(1).join(' ')}\nModerator: ${message.author.username}`)

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed)
          }
        }).catch(err => {
          message.reply('I was unable to ban the user!')
        })
      } else {
        message.reply('That user isn\'t in this guild!')
      }
    } else {
      message.reply('You didn\'t mention the user to ban!')
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err + '').catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['b'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'ban',
  category: 'Moderation',
  description: 'Bans the specified user.',
  usage: 'ban @<user> [reason]'
}
