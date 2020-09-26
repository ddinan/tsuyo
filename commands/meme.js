const Discord = require('discord.js')
const randomPuppy = require('random-puppy')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const subReddits = ['dankmeme', 'meme', 'memes', 'spicy_memes', 'me_irl']
  const random = subReddits[Math.floor(Math.random() * subReddits.length)]

  const img = await randomPuppy(random)
  const embed = new Discord.MessageEmbed()
    .setColor(colors.default)
    .setImage(img)

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'meme',
  category: 'Fun',
  description: 'Searches for the dankest of memes in the dankest of subreddits.',
  usage: 'meme'
}
