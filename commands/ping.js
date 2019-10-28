const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let pingEmbed = new Discord.RichEmbed()
      .setColor(0xF74847)
      .setFooter('PING')
      
      .addField(`${message.author.id}`, 'Hello world!');

    let msg = await message.channel.send(pingEmbed);

    let embed = new Discord.RichEmbed()
      .setColor(0x4699AA)
      .setFooter('PONG', messageEmbedAuthor.iconURL)
      .setThumbnail(message.guild.iconURL)

      .addField('Message Trip',
      `${msg.createdTimestamp - message.createdTimestamp}ms`)
      .addField('Websocket Heartbeat', `${Math.floor(client.pings[0])}ms`)
      .addField('Average Websocket Heartbeat',
      `${Math.floor(client.pings.average())}ms`);

    msg.edit(embed);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'ping',
  category: 'Utility',
  description: 'Returns your ping.',
  usage: 'ping'
};
