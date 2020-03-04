// WIP until Discord allows spoilers in embeds
const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');
const { parse } = require('node-html-parser');

exports.run = async (client, message, args, level) => {

    // Grab the HTML source code from fox-info.net/fox-gallery

    const ENDPOINT = 'http://fox-info.net';

    const URL = `${ENDPOINT}/fox-gallery`;

    request(URL, (err, body) => {
        // Randomly pick one <img /> as the source image URL
        if (err) {
            console.log(`Fail to complete a HTTP request to ${URL}`);
            return console.error(err);
        }

        try {
            const DOM = parse(body.body);

            const firstImageTag = DOM.querySelector('.gallery-item img');

            if (firstImageTag) {
                const imageSource = firstImageTag.getAttribute('src');

                if (typeof imageSource !== 'string') {
                    return console.error('Fail to get the image source from the first image tag');
                }

                const embed = new Discord.RichEmbed()
                    .setColor(colors.default)
                    .setImage(imageSource)
                    .setFooter('🦊',
                        'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')

                message.channel.send(embed)

            } else {
                console.log('Fail to locate the first image from the random gallery page');
            }

        } catch (err) {
            console.log(`Fail to parse the HTML content from ${URL}`);
            return console.error(err);
        }
    });

    // WIP: Might put one batch of imgs into Redit cache
};

exports.conf = {
    enabled: true,
    aliases: ['fox', 'kitsune'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'fox info gallery',
    category: 'Fun',
    description: 'Shows a random picture of a fox from fox-info.net.',
    usage: 'fox-info'
}