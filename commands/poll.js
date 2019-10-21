const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    if (!args.join(' ')) return message.reply('You need to give the question.');
    
    let embed = new Discord.RichEmbed()
    .setTitle(args.join(' '))
    .setDescription('Poll created by ' + message.author.tag)
    .setColor('#eeeeee');

    let msg = await message.channel.send(embed);
    
    await msg.react('👍');
    await msg.react('👎');
    await msg.react('🤷');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['vote', 'ask'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'poll',
  category: 'Moderation',
  description: 'Starts a poll.',
  usage: 'poll <question>'
};
