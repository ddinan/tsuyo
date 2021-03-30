const Discord = require('discord.js')
const axios = require('axios');
const colors = require("../lib/colors.json");
const countries = require('../lib/countries.json');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const url = 'https://api.covid19api.com/total/country/';
        if (args.length === 0) {
            message.reply("Not enough arguments")
        } else if (!countries[args[0]]) {
            message.reply("Wrong country format")
        } else {
            const slug = args[0]
            const payload = await axios.get(`${url}${slug}`)
            const covidData = payload.data.pop();
            const country = args[0].charAt(0).toUpperCase() + args[0].substr(1).toLowerCase()
            const embed = new Discord.MessageEmbed()
                .setAuthor('Covid statistics for ' + country)
                .setColor(colors.default)
                .addField('Confirmed', covidData.Confirmed, true)
                .addField('Deaths', covidData.Deaths, true)
                .addField('Recovered', covidData.Recovered, true)
                .addField('Active', covidData.Active, true)
                .setTimestamp()

            message.channel.send(embed)
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['corona', 'coronavirus', 'cv'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'covid',
    category: 'Utility',
    description: 'Shows COVID-19 statistics for a given country.',
    usage: 'covid <country>'
}