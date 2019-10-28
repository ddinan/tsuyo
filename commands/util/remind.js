const ms = require('ms');

exports.run = async (client, message, args, level) => {
  try {
    if (!ms(args[0])) return message.reply('You have to give a valid time!');
    if (!args[1]) return message.reply('You have to say what to remind you about!');
    
    setTimeout(async () => {
      let embed = new client.Embed('normal', {
        title: 'Reminder',
        description: args.slice(1).join(' ')
      });
      
      message.author.send(embed);
    }, ms(args[0]));
    
    message.channel.send("Reminder set!\nReminding you in: " + ms(ms(args[0]), {long: true}) + "\nI'll remind you in your DMS!");
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
  name: 'remind',
  category: 'Utility',
  description: 'Reminds you at the specified time of the specified thing.',
  usage: 'remind <time> <text>'
};