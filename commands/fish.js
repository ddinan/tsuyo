const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')
const ms = require('ms')
exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

        client.inventory.ensure(message.author.id, {
            member: message.author.id,
            rings: 0,
            petfood: 0,
            seeds: 0,
            worms: 0,
        })

        const worms = client.inventory.get(message.author.id, 'worms')

        if (worms === 0) return message.channel.send(lang.NoWorms)

        var d = 0
        d = Math.random()

        let fish;
        if (d < 0.67) {
            const choices = ["fish", "nothing"];

            const random = Math.floor(Math.random() * choices.length);
            fish = choices[random];
        } else if (d < 0.8) {
            const choices = ["tropical_fish", "blowfish", "lobster", "moneybag", "crab"];

            const random = Math.floor(Math.random() * choices.length);
            fish = choices[random];
        } else if (d < 0.95) {
            const choices = ["frog", "chest", "octopus", "squid"];

            const random = Math.floor(Math.random() * choices.length);
            fish = choices[random];
        } else if (d < 0.98) {
            const choices = ["seal", "dolphin", "turtle", ];

            const random = Math.floor(Math.random() * choices.length);
            fish = choices[random];
        } else if (d < 0.99) {
            const choices = ["person_surfing", "clownfish", "whale2", "merperson"];

            const random = Math.floor(Math.random() * choices.length);
            fish = choices[random];
        }

        client.inventory.set(message.author.id, worms - 1, 'worms')
        var rarity
        if (fish === "fish") rarity = "common"
        if (fish === "tropical_fish" || fish === "blowfish" || fish === "lobster" || fish === "octopus" || fish === "moneybag" || fish === "crab") rarity = "uncommon"
        if (fish === "squid" || fish === "octopus" || fish === "chest" || fish === "frog") rarity = "rare"
        if (fish === "seal" || fish === "dolphin" || fish === "turtle") rarity = "very rare"
        if (fish === "person_surfing" || fish === "clownfish" || fish === "whale2" || fish === "merperson") rarity = "legendary"

        var worth
        if (fish === "nothing") {
            rarity = "common"
            worth = 0
        }
        if (rarity === "common") worth = 25
        if (rarity === "uncommon") worth = 50
        if (rarity === "rare") worth = 100
        if (rarity === "very rare") worth = 250
        if (rarity === "legendary") worth = 500

        client.money.ensure(`${message.author.id}`, {
            member: message.author.id,
            money: 0
        })

        const money = client.money.get(message.author.id, 'money')
        client.money.set(`${message.author.id}`, money + worth, 'money')

        const embed = new MessageEmbed()
            .setAuthor(`🎣 ${lang.Fishing}`)
            .setColor(colors.default)
            .setDescription(`${lang.FoundAndSold} **${rarity}** :${fish}: ${lang.For} **${worth}**!`)
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        if (fish === "clownfish") {
            const nemo = client.emojis.cache.get("827417100233998357");

            embed = new MessageEmbed()
                .setAuthor(`🎣 ${lang.Fishing}`)
                .setColor(colors.default)
                .setDescription(`${lang.FoundAndSold} **${rarity}** ${nemo} ${lang.For} **${worth}**!`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
            return message.channel.send({
                embeds: [embed]
            })
        } else if (fish === "chest") {
            const chest = client.emojis.cache.get("827303211844632686");

            embed = new MessageEmbed()
                .setAuthor(`🎣 ${lang.Fishing}`)
                .setColor(colors.green)
                .setDescription(`${lang.FoundAndSold} **${rarity}** ${chest} ${lang.For} **${worth}**!`)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
            return message.channel.send({
                embeds: [embed]
            })
        } else if (fish === "nothing") {
            embed = new MessageEmbed()
                .setAuthor(`🎣 ${lang.Fishing}`)
                .setColor(colors.green)
                .setDescription(lang.FoundNothing)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            return message.channel.send({
                embeds: [embed]
            })
        } else return message.channel.send({
            embeds: [embed]
        })

    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'fish',
    category: 'Fun',
    description: 'Go fishing.',
    usage: 'fish'
}