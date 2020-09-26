const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const embed = new Discord.MessageEmbed()
    .setTitle('💰 Donating')
    .setColor(colors.default)
    .setThumbnail('https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
    .addField('Want exclusive donator perks and more bot features?', '[Click here to donate.](https://www.patreon.com/tsuyo)')
    .addField('Donator Perks', '💰 `$5000`\n💼 `Donator role` in the Tsuyo Bot Discord\n🎉 Access to the exclusive `donator lounge`\n🎨 Free `coloured role` of your choice')

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['donating'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'donate',
  category: 'Utility',
  description: 'Shows information about donating.',
  usage: 'donate'
}
