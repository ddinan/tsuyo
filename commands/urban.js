const request = require('request')
const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  if (message.channel.nsfw === false) return message.channel.send('You need to be in an NSFW channel to use this command.')
  if (!args[0]) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(colors.red)
        .setDescription('You need to specify a term to define.')
    )
  }

  request(`http://api.urbandictionary.com/v0/define?term=${args[0]}`, function (error, body) {
    var result = JSON.parse(body.body).list[0]
    if (!result) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor(colors.red)
          .setDescription(`Urban Dictionary does not contain a definition for \`${args[0]}\`.`)
      )
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#1D2439')
      .setThumbnail('https://i.imgur.com/D19IeLX.png')
      .setTitle(result.word)
      .setDescription(result.definition)
      .setFooter('URBAN DICTIONARY',
        'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')

      .addField('Example', result.example)

    message.channel.send(embed)
  })
}

exports.conf = {
  enabled: true,
  aliases: ['urban-dictionary', 'ud'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'urban',
  category: 'Fun',
  description: 'Searches the Urban Dictionary for [term].',
  usage: 'urbandictionary [term]'
}
