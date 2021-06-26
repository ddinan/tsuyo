const random = require('random');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (!args[0]) return message.channel.send(lang.NoAmountSpecified)
        if (isNaN(args[0])) return message.channel.send(lang.InvalidAmount)
        const cooldown = cooldowns.get(message.author.id);
        if (cooldown) {
            const remaining = humanizeDuration(cooldown - Date.now());

            return message.channel.send(`${lang.NeedToWait} ${remaining} ${lang.GambleAgain}`)
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

        if (money < args[0]) return message.channel.send(lang.NotEnoughMoney)
        if (args[0] < 50) return message.channel.send(lang.CannotBet)
        if (args[0] > 50000) return message.channel.send(lang.CannotBet)

        // TODO: Better system

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
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
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