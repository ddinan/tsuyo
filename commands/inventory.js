const colors = require('../lib/colors.json')
const {
    MessageEmbed
} = require('discord.js')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
        const key = `${message.author.id}`

        client.inventory.ensure(key, {
            member: key,
            rings: 0,
            petfood: 0,
            seeds: 0,
            worms: 0
        })

        const embed = new MessageEmbed()
            .setTitle(`🎒`)
            .setColor(colors.default)
            .addField(`💍 ${lang.WeddingRings}`, client.inventory.get(key, 'rings'))
            .addField(`🌰 ${lang.Seeds}`, client.inventory.get(key, 'seeds'))
            .addField(`🥫 ${lang.PetFood}`, client.inventory.get(key, 'petfood') + ' cans')
            .addField(`🪱 ${lang.Worms}`, client.inventory.get(key, 'worms') + ' worms')
            .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()

        message.channel.send({
            embeds: [embed]
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['inv', 'backpack', 'bp', 'bag'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'inventory',
    category: 'Economy',
    description: 'Shows all things in your inventory.',
    usage: 'inventory'
}