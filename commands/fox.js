// WIP until Discord allows spoilers in embeds
const Discord = require('discord.js');
const request = require('request');
const colors = require('../lib/colors.json');
const { parse } = require('node-html-parser');
const redis = require('redis');

let usingRedsi = true;

const redisImageCollections = redis.createClient({
    host: 'redis',
    DB: 0
});

function redisErrorHandler(err) {
    if (err.message.includes('Redis connection to redis:6379 failed')) {
        usingRedsi = false;
        return redisImageCollections.quit();
    }
    console.error(`[Redis Client Error] ${err}`);
}

redisImageCollections.on('error', redisErrorHandler);

const ENDPOINT = 'http://fox-info.net';
const URL = `${ENDPOINT}/fox-gallery`;
const COLLECTION = 'collection';

function locateAllGalleryBlock(DOM) {
    const allImage = DOM.querySelectorAll('.gallery-item img');
    const allGalleryImage = allImage.map(galleryBlock => {
        return {
            ID: Math.random().toString(36),
            src: galleryBlock.getAttribute('src'),
        }
    });
    return allGalleryImage;
}

function getDOM(cb) {
    request(URL, (err, body) => {
        // Randomly pick one <img /> as the source image URL
        if (err) {
            console.log(`Fail to complete a HTTP request to ${URL}`);
            if (typeof cb === 'function') cb(err, null);
        }

        try {
            const DOM = parse(body.body);
            if (typeof cb === 'function') cb(null, DOM);
        } catch (err) {
            if (typeof cb === 'function') cb(err, null);
        }
    });
}

function repopulateGalleryCollection() {
    return new Promise((resolve, reject) => {
        getDOM((err, DOM) => {
            if (err) return reject(err);
            const galleryCollection = locateAllGalleryBlock(DOM);
            if (!usingRedsi) {
                return resolve(galleryCollection);
            }
            redisImageCollections.set(COLLECTION, JSON.stringify(galleryCollection));
            return resolve();
        })
    });
}

function sendFoxImageToChat(imageURL, message) {
    if (imageURL && message) {
        const embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setImage(imageURL)
            .setFooter('🦊',
                'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')

        message.channel.send(embed);
    }
}

function pickRandomGallery(galleryCollection) {
    const randomIndex = Math.floor(Math.random() * galleryCollection.length);
    const randomGallery = galleryCollection[randomIndex];
    return [randomGallery, randomIndex];
}

exports.run = async (client, message, args, level) => {

    if (usingRedsi) redisImageCollections.ping();

    if (!usingRedsi) {
        const galleryCollection = await repopulateGalleryCollection();
        const [randomGallery] = pickRandomGallery(galleryCollection);
        return sendFoxImageToChat(randomGallery.src, message);
    }

    const imageCollection = redisImageCollections.cache.cache.get(COLLECTION, async (err, collection) => {
        if (err) return console.error(err);

        if (collection === null) {
            // Empty collection
            // Grab the HTML source code from fox-info.net/fox-gallery
            try {
                await repopulateGalleryCollection();
            } catch (err) {
                console.error(err);
            }
        }

        // Using the existing cached collection

        redisImageCollections.cache.cache.get(COLLECTION, (err, galleryBlock) => {
            if (err) return console.error(err);
            galleryBlock = JSON.parse(galleryBlock);
            const [randomGallery, randomIndex] = pickRandomGallery(galleryBlock);
            sendFoxImageToChat(randomGallery.src, message);
            galleryBlock.splice(randomIndex, 1);
            redisImageCollections.set(COLLECTION, JSON.stringify(galleryBlock));
        });

    });

};

exports.conf = {
    enabled: true,
    aliases: ['fox', 'kitsune'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'fox',
    category: 'Fun',
    description: 'Shows a random picture of a fox.',
    usage: 'fox'
}  