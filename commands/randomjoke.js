const Discord = require('discord.js')
const joke = require('one-liner-joke').getRandomJoke;
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    message.channel.send(
      new Discord.RichEmbed()
        .setColor(colors.teal)
        .setDescription(joke({'exclude_tags': ['dirty', 'racist', 'marriage', 'sex', 'death']}).body)
        .setFooter(`😂`,
        'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed()
        .setColor(colors.red)
        .addField('There was an error!', `${err}`)
    ).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['joke'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'randomjoke',
  category: 'Fun',
  description: 'Returns a random joke.',
  usage: 'randomjoke'
};
