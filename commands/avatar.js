exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const embed = new Discord.RichEmbed()
    .setColor(colors.blue)
    .setImage(`${message.author.displayAvatarURL}`)
    .setThumbnail(`${message.author.displayAvatarURL}`)
    .addField("Your avatar:", `${message.author.displayAvatarURL}`, true)
        
	if (!message.mentions.users.size) {
		return message.channel.send(embed);
	}
        
    const user = message.mentions.users.first() || message.author;
    const embed2 = new Discord.RichEmbed()
    .setColor(colors.blue)
    .setImage(`${user.displayAvatarURL}`)
    .setThumbnail(`${user.displayAvatarURL}`)
    .addField(`${user.username}'s avatar:`, `${user.displayAvatarURL}`, true);

	message.channel.send(embed2);
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'avatar',
  category: 'Utility',
  description: 'Returns either yours or [member]\'s avatar.',
  usage: 'avatar [member]'
};
