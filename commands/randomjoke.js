const joke = require('one-liner-joke').getRandomJoke;

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    message.channel.send(joke({'exclude_tags': ['dirty', 'racist', 'marriage', 'sex', 'death']}).body);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['joke'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'randomjoke',
  category: 'Fun',
  description: 'Returns a random joke.',
  usage: 'randomjoke'
};
