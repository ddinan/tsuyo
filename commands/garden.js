const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

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

        const p1 = client.garden.get(`${message.author.id}`, 'plant1')
        const p2 = client.garden.get(`${message.author.id}`, 'plant2')
        const p3 = client.garden.get(`${message.author.id}`, 'plant3')
        var s1 = client.garden.get(`${message.author.id}`, 'plant1Stage')
        var s2 = client.garden.get(`${message.author.id}`, 'plant2Stage')
        var s3 = client.garden.get(`${message.author.id}`, 'plant3Stage')

        var f1 = s1.replace('1', '').replace('2', ':seedling: ').replace('3', ':seedling: ').replace('4', `:${p1}: `)
        var f2 = s2.replace('1', '').replace('2', ':seedling: ').replace('3', ':seedling: ').replace('4', `:${p2}: `)
        var f3 = s3.replace('1', '').replace('2', ':seedling: ').replace('3', ':seedling: ').replace('4', `:${p3}: `)

        const empty = client.emojis.cache.get("827352923339227186");
        if (f1 === "0") f1 = empty
        if (f2 === "0") f2 = empty
        if (f3 === "0") f3 = empty

        const grass = client.emojis.cache.get("827308950428712960");
        message.channel.send(`${f1}${f2}${f3}\n${grass}${grass}${grass}`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
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