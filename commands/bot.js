const Discord = require('discord.js');
const colors = require('../lib/colors.json');
const moment = require('moment');
const { version } = require('discord.js');
require('moment-duration-format');

exports.run = (client, message, args, level) => {
	const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
	const embed = new Discord.RichEmbed()
	.setAuthor("Bot Information")
	.setColor(colors.teal)
	.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
	.addField("Total guilds:", message.client.guilds.size, true)
	.addField("Total members:", `${message.client.users.size}`, true)
	.addField("ID", `${message.client.user.id}`, true)
	.addField("Hosted in", `:flag_us: United States`, true)
	.addField("Uptime", `${duration}`, true)
	.addField("Created by", `<@191517443519152129>`, true)
	.setTimestamp();
    message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  aliases: ['botinfo'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'bot',
  category: 'Utility',
  description: 'Displays information about the bot',
  usage: 'bot'
};
