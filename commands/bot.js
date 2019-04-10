const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = {
	name: 'bot',
	execute(message) {
        const embed = new Discord.RichEmbed()
            .setAuthor("Bot Information")
            .setColor(colors.blue)
            .setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/845886deb497cbb6d181243a0d1de13f.png?size=2048")
            .addField("Total guilds:", `${message.client.guilds.size}`, true)
            .addField("Total members:", `${message.client.users.size}`, true)
            .addField("ID", `${message.client.user.id}`, true)
            .addField("Hosted in", `:flag_us: United States`, true)
            .setTimestamp();
        
		message.channel.send({embed});
	},
};

