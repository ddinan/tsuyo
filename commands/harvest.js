const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
    try {
        if (message.author.bot === true) return

        client.garden.ensure(message.author.id, {
            member: message.author.id,
            plant1: null,
            plant2: null,
            plant3: null,
            plant1Stage: "0",
            plant2Stage: "0",
            plant3Stage: "0",
        })

        if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
            let slot = ''
            let stage
            if (args[0] === '1') {
                slot = 'plant1'
                stage = 'plant1Stage'
            }
            if (args[0] === '2') {
                slot = 'plant2'
                stage = 'plant2Stage'
            }
            if (args[0] === '3') {
                slot = 'plant3'
                stage = 'plant3Stage'
            }

            var getPlant = client.garden.get(`${message.author.id}`, slot)
            var getStage = client.garden.get(`${message.author.id}`, stage)

            if (getStage !== "4") return message.channel.send("This plant is not ripe enough to be harvested yet.")

            client.garden.set(`${message.author.id}`, null, slot)
            client.garden.set(`${message.author.id}`, "0", stage)

            var rarity
            if (getPlant === "hibiscus" || getPlant === "ear_of_rice" || getPlant === "blossom" || getPlant === "rose") rarity = "common"
            if (getPlant === "tanabata_tree" || getPlant === "bamboo" || getPlant === "sunflower" || getPlant === "moneybag") rarity = "uncommon"
            if (getPlant === "deciduous_tree" || getPlant === "evergreen_tree" || getPlant === "chest") rarity = "rare"
            if (getPlant === "palm_tree" || getPlant === "cactus" || getPlant === "chest") rarity = "very rare"
            if (getPlant === "skull" || getPlant === "bone" || getPlant === "t_rex" || getPlant === "sauropod") rarity = "legendary"

            var worth
            if (rarity === "common") worth = 100
            if (rarity === "uncommon") worth = 200
            if (rarity === "rare") worth = 300
            if (rarity === "very rare") worth = 500
            if (rarity === "legendary") worth = 1000

            client.money.ensure(`${message.author.id}`, {
                member: message.author.id,
                money: 0
            })

            const money = client.money.get(message.author.id, 'money')
            client.money.set(`${message.author.id}`, money + worth, 'money')

            const embed = new Discord.MessageEmbed()
                .setAuthor('🌼 Garden')
                .setColor(colors.green)
                .setDescription(`You harvested a **${rarity}** :${getPlant}: for **${worth}**!`)
            return message.channel.send(embed)
        } else {
            message.channel.send('You need to specify which slot you want to harvest (1-3)')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'garden',
    category: 'Fun',
    description: 'Shows your garden.',
    usage: 'garden'
}