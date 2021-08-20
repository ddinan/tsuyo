const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

        const embed = new MessageEmbed()
            .setTitle(`🛒 ${lang.Shop}`)
            .setDescription(`${lang.PurchaseItem} \`${prefix}buy <${lang.item}>\``)
            .setColor(colors.default)
            .addField(`💍 ${lang.WeddingRing} ($1,300)`, `${lang.WeddingRingDesc} \`${prefix}marry\`.`, true)
            .addField(`🥫 ${lang.PetFood} ($50)`, `${lang.PetFoodDesc} \`${prefix}pet\`.`, true)
            .addField(`🌰 ${lang.Seed} ($5)`, `${lang.SeedDesc} \`${prefix}garden\`.`, true)
            .addField(`🪱 ${lang.Worm}($10)`, `${lang.WormDesc} \`${prefix}fish\`.`, true)
            //.addField('🚗 Car ($25,000)', `Go fast.`, true)
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
    aliases: ['store'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'shop',
    category: 'Economy',
    description: 'Shows a list of purchasable items.',
    usage: 'shop'
}