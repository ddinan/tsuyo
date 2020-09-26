const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first()
    const settings = client.getSettings(message.guild.id)
    if (user) {
      if (message.guild.members.cache.get(message.author.id).highestRole.name == '@everyone') message.reply('The role you are trying to add is above your roles position!')
      else {
        if (message.guild.members.cache.get(message.author.id).highestRole.position >= message.guild.roles.find(r => r.name == args.slice(1).join(' ')).position) {
          if (message.member.hasPermission('SEND_MESSAGES')) {
            const member = message.guild.member(user)
            if (member) {
              if (message.guild.roles.find(r => r.name == args.slice(1).join(' '))) {
                member.removeRole(message.guild.roles.find(r => r.name == args.slice(1).join(' '))).then(() => {
                  message.reply(`Successfully added Role to ${user.tag}`)
                }).catch('There was an error!')
              } else message.reply('I can\'t find that Role!')
            } else message.reply('That user isn\'t in this guild!')
          } else message.reply('You dont have the Manage Roles permission!')
        } else message.reply('The role you are trying to add is above your roles position!')
      }
    } else message.reply('You didn\'t mention the user to remove the Role from!')
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['rr', 'rm', 'takerole'],
  guildOnly: true,
  permLevel: 'Administrator'
}

exports.help = {
  name: 'removerole',
  category: 'Moderation',
  description: 'Removes the specifyed role from your role list.',
  usage: 'removerole <user> <role name/id>'
}
