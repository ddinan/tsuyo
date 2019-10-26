const Discord = require('discord.js');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {
  try {
    require('request')({url: 'http://www.splashbase.co/api/v1/images/random?images_only=true', json: true}, (req, res, json) => {
      let embed = new Discord.RichEmbed()
      .setTitle('Random Picture')
      .setColor(colors.teal)
      .setImage(json.url);
      
      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['randomimage', 'randompic', 'randomimg', 'ranpic'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'randompicture',
  category: 'Fun',
  description: 'Returns a random picture.',
  usage: 'randompicture'
};