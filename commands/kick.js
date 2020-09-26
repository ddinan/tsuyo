const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first()
    const settings = client.getSettings(message.guild.id)

    if (user) {
      const member = message.guild.member(user)
      if (member) {
        member.kick(args.slice(1).join(' ')).then(() => {
          message.reply(`Successfully kicked ${user.tag}`)

          const modLogChannel = settings.modLogChannel
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            const embed = new Discord.MessageEmbed()
              .setTitle('User Ban')
              .setColor(colors.red)
              .setDescription(`Name: ${user.username}\nID: ${user.id}\nReason: ${args.slice(1).join(' ')}\nModerator: ${message.author.username}`)

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error)
          }
        }).catch(err => {
          message.reply('I wasn\'t able to kick the member')
        })
      } else {
        message.reply('That user isn\'t in this guild!')
      }
    } else {
      message.reply('You didn\'t mention the user to kick!')
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['ki'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'kick',
  category: 'Moderation',
  description: 'Kicks the specified member.',
  usage: 'kick @<user> [reason]'
}
