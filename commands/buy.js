const buyItem = (name, amount, client, message) => {
  let money = client.money.get(message.author.id, 'money');
  
  if (money < amount) return message.reply("You don't have enough money to buy this command!");
  if (client.items.has(message.author.id, name)) return message.reply("You've already bought this item!")
        
  client.money.set(message.author.id, money - amount, 'money');
  client.items.set(message.author.id, true, name);
  message.reply('You have access to the ' + name + ' Command!');
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    client.money.ensure(message.author.id, {
      money: 0,
      stone: 250
    });
    client.items.ensure(message.author.id, {});
    
    if (!args[0]) return message.channel.send(`Commands:
OwO - $50
RickRoll - $75`);
    
    switch (args[0].toLowerCase()) {
      case 'owo':
        buyItem('owo', 50, client, message);
        break;
      case 'rickroll':
        buyItem('rickroll', 200, client, message);
        break;
      default:
        message.reply("That's not an item!");
        break;
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['shop'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'buy',
  category: 'Eco',
  description: 'Purchases an item using.',
  usage: 'buy [item]'
};
