const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  
  const embed = new Discord.MessageEmbed()
    .setTitle('🛒 Shop')
    .setDescription(`To purchase an item, type \`${prefix}buy <item>\``)
    .setColor(colors.default)
    .addField('💍 Wedding Ring ($1,300)', `Used to propose to your partner via \`${prefix}marry\`.`, true)
    .addField('🥫 Pet Food ($50)', `Used to feed your \`${prefix}pet\`.`, true)
    .addField('🌰 Seed ($5)', `Random seed to plant in your \`${prefix}garden\`.`, true)
    .addField('🚗 Car ($25,000)', `Go fast.`, true)
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['store'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'shop',
  category: 'Economy',
  description: 'Shows a list of purchasable items.',
  usage: 'shop'
}
