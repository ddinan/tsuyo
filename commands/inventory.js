const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  const key = `${message.author.id}`

  client.inventory.ensure(key, {
    member: key,
    rings: 0,
    petfood: 0,
    seeds: 0,
  })

  const embed = new Discord.MessageEmbed()
    .setTitle('🎒 Your Inventory')
    .setColor(colors.default)
    .addField(`💍 Wedding Rings:`, client.inventory.get(key, 'rings'))
    .addField(`🌰 Seeds:`, client.inventory.get(key, 'seeds'))
    .addField(`🥫 Pet Food`, client.inventory.get(key, 'petfood') + ' cans')
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['inv', 'backpack', 'bp', 'bag'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'inventory',
  category: 'Economy',
  description: 'Shows all things in your inventory.',
  usage: 'inventory'
}
