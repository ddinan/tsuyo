exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  	const results = ['Yes.', 'No.', 'Maybe.'];
    const result = results[Math.floor(Math.random()*results.length)];
    let input = args.join(" ");
	
	let settings = client.getSettings(message.guild.id);
        
    if (!input) { 
        const embed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setTitle('Invalid Syntax')
        .setDescription(`${settings.prefix}8ball [message]\`\n\nIf question contains "who" or "whose", a random member from the guild will be chosen.`);
            
        message.channel.send(embed);
    } 
        
    else {
        if (message.content.includes('who') || message.content.includes('Who')) {
            var member = message.guild.members.random().displayName;
            message.channel.send(`${member}.`);
        } else {
            message.channel.send(result);
        }
    }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: '8ball',
  category: 'Utility',
  description: 'Ask the mighty 8ball a question.',
  usage: '8ball <question>'
};
