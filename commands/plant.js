const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const ms = require('ms')
exports.run = async (client, message, args) => {
    try {
        const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

        client.inventory.ensure(message.author.id, {
            member: message.author.id,
            rings: 0,
            petfood: 0,
            seeds: 0,
            worms: 0
        })

        const seeds = client.inventory.get(message.author.id, 'seeds')

        if (seeds === 0) return message.channel.send('You do not have any seeds. Buy some in the shop.')

        client.garden.ensure(message.author.id, {
            member: message.author.id,
            plant1: null,
            plant2: null,
            plant3: null,
            plant1Stage: "0",
            plant2Stage: "0",
            plant3Stage: "0",
        })

        client.inventory.set(message.author.id, seeds - 1, 'seeds')

        const p1 = client.garden.get(`${message.author.id}`, 'plant1')
        const p2 = client.garden.get(`${message.author.id}`, 'plant2')
        const p3 = client.garden.get(`${message.author.id}`, 'plant3')

        if (!args[0]) return message.channel.send('You need to specify which slot you want to plant the seed in (1-3)')

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
            if (args[0] > 3) return message.channel.send('You can only have 3 plants in your garden at a time.')

            var d = Math.random()
            let plant;
            if (d < 0.5) {
                const choices = ["hibiscus", "ear_of_rice", "blossom", "rose"];

                const random = Math.floor(Math.random() * choices.length);
                plant = choices[random];
            } else if (d < 0.75) {
                const choices = ["tanabata_tree", "bamboo", "sunflower", "moneybag"];

                const random = Math.floor(Math.random() * choices.length);
                plant = choices[random];
            } else if (d < 0.9) {
                const choices = ["deciduous_tree", "evergreen_tree", "chest"];

                const random = Math.floor(Math.random() * choices.length);
                plant = choices[random];
            } else if (d < 0.98) {
                const choices = ["palm_tree", "cactus"];

                const random = Math.floor(Math.random() * choices.length);
                plant = choices[random];
            } else if (d < 0.99) {
                const choices = ["bone", "skull", "t_rex", "sauropod"];

                const random = Math.floor(Math.random() * choices.length);
                plant = choices[random];
            }

            client.garden.set(`${message.author.id}`, plant, slot)
            client.garden.set(`${message.author.id}`, "1", stage)
            const embed = new Discord.MessageEmbed()
                .setAuthor('🌼 Garden')
                .setColor(colors.green)
                .setDescription(`You planted a seed in slot \`${args[0]}\`. Be sure to water it every 24 hours with \`` + prefix + 'water`.')
            return message.channel.send(embed)
        } else {
            message.channel.send('You need to specify which slot you want to plant the seed in (1-3)')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'plant',
    category: 'Fun',
    description: 'Plant seeds in your ;;garden.',
    usage: 'plant <slot>'
}