exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {

        if (!args[0]) return message.channel.send(lang.NoItemSpecified)
        const items = ['weddingring', 'ring', 'rings', 'food', 'petfood', 'seed', 'seeds', 'worm', 'worms']
        if (!items.includes(args[0])) return message.channel.send('Invalid item.')
        if (!args[1]) return message.channel.send(lang.HowManyToBuy)

        function isInt(value) {
            if (isNaN(value)) {
                return false;
            }
            var x = parseFloat(value);
            return (x | 0) === x;
        }

        if (isNaN(args[1]) || !isInt(args[1]) || Math.sign(args[1]) === -1) return message.channel.send(lang.InvalidAmount)

        const key = `${message.author.id}`

        client.money.ensure(key, {
            member: key,
            money: 0
        })

        client.inventory.ensure(key, {
            member: key,
            rings: 0,
            petfood: 0,
            seeds: 0,
            worms: 0
        })

        const money = client.money.get(key, 'money')

        function buyItem(money, price, quantity, item) {
            const total = price * quantity
            if (money < price * quantity) return message.channel.send(lang.NotEnoughMoney)

            client.money.set(key, money - total, 'money')
            const items = item > 1 ? item : item + 's'
            message.channel.send(`${lang.YouBought} \`${args[1]} ${items}\` ${lang.For} \`$${price * quantity}\`.\n**${lang.NewBalance}** ${money - total}`)

            if (args[0] === 'weddingring' || args[0] === 'ring' || args[0] === 'rings') {
                var number = client.inventory.get(key, 'rings')
                var newNumber = parseInt(args[1]) + parseInt(number)
                client.inventory.set(key, newNumber, 'rings')
            }

            if (args[0] === 'food' || args[0] === 'petfood') {
                var number = client.inventory.get(key, 'petfood')
                var newNumber = parseInt(args[1]) + parseInt(number)
                client.inventory.set(key, newNumber, 'petfood')
            }

            if (args[0] === 'seed' || args[0] === 'seeds') {
                var number = client.inventory.get(key, 'seeds')
                var newNumber = parseInt(args[1]) + parseInt(number)
                client.inventory.set(key, newNumber, 'seeds')
            }

            if (args[0] === 'worm' || args[0] === 'worms') {
                var number = client.inventory.get(key, 'worms')
                var newNumber = parseInt(args[1]) + parseInt(number)
                client.inventory.set(key, newNumber, 'worms')
            }
        }

        if (args[0] === 'wedding' || args[0] === 'ring' || args[0] === 'rings') {
            const rings = args[0] > 1 ? 'wedding rings' : 'wedding ring'
            buyItem(money, 1300, args[1], rings)
        }

        if (args[0] === 'food' || args[0] === 'petfood') {
            const food = args[0] > 1 ? 'cans of pet food' : 'can of pet food'
            buyItem(money, 50, args[1], food)
        }

        if (args[0] === 'seed' || args[0] === 'seeds') {
            const seeds = args[0] > 1 ? 'seeds' : 'seed'
            buyItem(money, 25, args[1], seeds)
        }

        if (args[0] === 'worm' || args[0] === 'worms') {
            const worms = args[0] > 1 ? 'worms' : 'worm'
            buyItem(money, 20, args[1], worms)
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
    errors.embedError(err, lang, message)
    }
}


exports.conf = {
    enabled: true,
    aliases: ['purchase'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'buy',
    category: 'Economy',
    description: 'Purchases an item from the store.',
    usage: 'buy <item>'
}