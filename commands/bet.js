const random = require('random');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send('You need to specify an amount to bet.')
    if (isNaN(args[0])) return message.channel.send('Invalid amount.')
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now());

      return message.channel.send(`You have to wait ${remaining} before you can gamble again`)
      .catch(console.error);
    }

    cooldowns.set(message.author.id, Date.now() + 5000);
    setTimeout(() => cooldowns.delete(message.author.id), 5000);

    const member = message.mentions.members.first() ? message.mentions.members.first() : message.member
    const key = `${message.author.id}`

    client.money.ensure(key, {
      member: key,
      money: 0
    })

    const money = client.money.get(member.id, 'money');
    sides1 = Math.floor(Math.random() * 10) + 1
    sides2 = Math.floor(Math.random() * 10) + 1

    if (money < args[0]) return message.channel.send('You do not have enough money to gamble.')
    if (args[0] < 50) return message.channel.send('You cannot bet less than $50 and cannot bet more than $50000.')
    if (args[0] > 50000) return message.channel.send('You cannot bet less than $50 and cannot bet more than $50000.')

    if (sides1 > sides2) {
      message.channel.send("You win!")
      message.channel.send("You rolled: " + String(sides1))
      message.channel.send("Rhino rolled: " + String(sides2))
      client.money.set(`${message.author.id}`, (money + parseInt(args[0])), 'money')
      message.channel.send(`You now have $` + (money + parseInt(args[0])))
      return;

    } else if (sides1 < sides2) {
      message.channel.send("You lose.")
      message.channel.send("You rolled: " + String(sides1))
      message.channel.send("Rhino rolled: " + String(sides2))
      client.money.set(`${message.author.id}`, (money - parseInt(args[0])), 'money')
      message.channel.send(`You now have $` + (money - parseInt(args[0])))
      return;

    } else if (sides1 == sides2) {
      message.channel.send("You rolled: " + String(sides1)),
      message.channel.send("Rhino rolled: " + String(sides2)),
      message.channel.send("Your roll has to be at least 1 greater than rhinos")
      return;
    }
};

exports.conf = {
  enabled: true,
  aliases: ["gamble"],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'bet',
  category: 'Economy',
  description: 'Bet some coins.\n Also A thanks to Northern Lights#7944 for helping in the creation of this command.',
  usage: 'bet <amount>'
}
