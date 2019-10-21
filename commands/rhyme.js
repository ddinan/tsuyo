const rhyme = require('rhyme');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.reply('You need to input the word to rhyme!');
    
    let msg = await message.reply('Finding rhymes...');
    
    rhyme(async (rl) => {
      let rhymes = '';
      let words = rl.rhyme(args.join(' '));
      
      words.forEach(word => {
        rhymes += word.toPropperCase() + ', ';
      });

      rhymes = rhymes.slice(0, -2);

      let embed = new client.Embed('blend', {
        title: 'Rhyme',
        description: `**Rhyming Words**\n${rhymes || 'None Found.'}`
      });

      msg.edit(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'rhyme',
  category: 'Fun',
  description: 'Returns all the words that rhyme with the specified word.',
  usage: 'rhyme <word>'
};