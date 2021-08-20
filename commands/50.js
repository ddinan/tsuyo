// WIP until Discord allows spoilers in embeds
const {
    MessageEmbed
} = require('discord.js');

const request = require('request');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const random = require('random-puppy');
        if (message.channel.nsfw === false) return message.channel.send('You need to be in an NSFW channel to use this command.')

        random('fiftyfifty').then(url => {
            const embed = new MessageEmbed()
                .setAuthor('Reddit 50/50', 'https://www.redditinc.com/assets/images/site/reddit-logo.png', url)
                .setColor('#FF4300')
                .setImage(`${url}`)

            message.channel.send({
                embeds: [embed]
            })
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
};

exports.conf = {
    enabled: false,
    aliases: ['fifty', 'fiftyfifty', 'fifty-fifty', '5050', '50-50', '50/50', 'fifty/fifty'],
    guildOnly: true,
    permLevel: 'User'
};

exports.help = {
    name: '50',
    category: 'Fun',
    description: 'Reddit 50/50 challenge.',
    usage: '50'
};