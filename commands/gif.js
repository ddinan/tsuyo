const Discord = require('discord.js');
const config = require('../config.json');
const colour = require('../config.json');

module.exports = {
	name: 'gif',
	description: 'Sends a .gif image related to your input.',
	async execute(message) {
        const args = message.content.split(" ").slice(1);
        const got = require(`got`);
        const api = 'dc6zaTOxFJmzC';
        const res = await got(`https://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(args.join(" "))}`, {json: true});
        
		if (args.length < 1) 
            return message.reply(`you need to specify a gif to search.`);
        
        if (!res || !res.body || !res.body.data)
            return message.channel.send("@Failed to find a gif that matched your query.");
        
        const embed = new Discord.RichEmbed()
            .setImage(res.body.data.image_url)
            .setColor(config.color)
        
        return message.channel.send({embed});
	},
};