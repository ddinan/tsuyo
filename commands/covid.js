const {
    MessageEmbed
} = require('discord.js')

const axios = require('axios');
const colors = require("../lib/colors.json");
const countries = require('../lib/countries.json');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const url = 'https://api.covid19api.com/total/country/';
        if (args.length === 0) {
            message.reply(lang.NoArgumentSpecified)
        } else if (!countries[args[0]]) {
            message.reply(lang.InvalidArgument)
        } else {
            const slug = args[0]
            const payload = await axios.get(`${url}${slug}`)
            const covidData = payload.data.pop();
            const country = args[0].charAt(0).toUpperCase() + args[0].substr(1).toLowerCase()

            const embed = new MessageEmbed()
                .setAuthor(`${lang.CovidStatisticsFor} ${country}`)
                .setColor(colors.default)
                .addField(lang.Confirmed, covidData.Confirmed, true)
                .addField(lang.Deaths, covidData.Deaths, true)
                .addField(lang.Recovered, covidData.Recovered, true)
                .addField(lang.Active, covidData.Active, true)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            message.channel.send({
                embeds: [embed]
            })
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
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