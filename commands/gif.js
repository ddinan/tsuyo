const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'gif',
	description: 'Sends a .gif image related to your input.',
	async execute(message) {
        const args = message.content.split(" ").slice(1);
        const got = require(`got`);
        const api = 'dc6zaTOxFJmzC';
        const res = await got(`https://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(args.join(" "))}`, {json: true});
        
		if (args.length < 1) 
            return message.channel.send(`You need to specify a gif to search.`);
        
        if (!res || !res.body || !res.body.data)
            return message.channel.send("@Failed to find a gif that matched your query.");
        
        const embed = new Discord.RichEmbed()
            .setImage(res.body.data.image_url)
            .setColor(colors.blue)
        
        return message.channel.send({embed});
	},
};