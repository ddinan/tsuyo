exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send('You have to input the HEX code!');
      
    let hex = args.join(' ').replace('#', '');
    let r = Number(hex.substring(0, 2) );
    let g = parseInt(hex.substring(2, 4));
    let b = parseInt(hex.substring(4, 6));

    message.channel.send('RGB Color Code: rgb(' + r + ', ' + g + ', ' + b + ')');
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
  name: 'hextorgb',
  category: 'Utility',
  description: 'Converts HEX to RGB',
  usage: 'hextorgb <value>'
};
