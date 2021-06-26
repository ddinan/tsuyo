const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (message.author.bot === true) return

        client.cooldown.ensure(`${message.author.id}`, {
            member: message.author.id,
            dailybonus: 0,
            rep: 0,
            plants: 0
        })

        const cooldown = client.cooldown.get(message.author.id, 'plants')

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (cooldown === date) return message.channel.send(lang.AlreadyWatered)

        client.cooldown.set(`${message.author.id}`, date, 'plants') // Activate 24 hour cooldown

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

        if (p1 === null && p3 === null && p3 === null) return message.channel.send(lang.NoPlants)

        var s1 = client.garden.get(`${message.author.id}`, 'plant1Stage')
        var s2 = client.garden.get(`${message.author.id}`, 'plant2Stage')
        var s3 = client.garden.get(`${message.author.id}`, 'plant3Stage')

        if (s1 === "1") s1 = "2"
        else if (s1 === "2") s1 = "3"
        else if (s1 === "3") s1 = "4"
        client.garden.set(`${message.author.id}`, s1, 'plant1Stage')

        if (s2 === "1") s2 = "2"
        else if (s2 === "2") s2 = "3"
        else if (s2 === "3") s2 = "4"
        client.garden.set(`${message.author.id}`, s2, 'plant2Stage')

        if (s3 === "1") s3 = "2"
        else if (s3 === "2") s3 = "3"
        else if (s3 === "3") s3 = "4"
        client.garden.set(`${message.author.id}`, s3, 'plant3Stage')

        message.channel.send(lang.WateredPlants)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['wp', 'waterplants'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'water',
    category: 'Fun',
    description: 'Waters the plants in your garden.',
    usage: 'water'
}