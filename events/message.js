const Discord = require('discord.js');
const colors = require('../lib/colors.json');
const cooled = new Discord.Collection();

module.exports = async (client, message) => {
  	if (message.author.bot) return;
  	if (client.config.blacklisted.includes(message.author.id)) return;
  
  	let settings;
  
  	if (message.guild) settings = client.getSettings(message.guild.id);
  	else settings = client.config.defaultSettings;
	
	if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

  	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  	if (message.content.match(prefixMention)) {
		const embed = new Discord.RichEmbed()
		.setTitle("Help")
		.setColor(colors.teal)
		.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
		.addField("Commands", `Commands can be found by typing \`${settings.prefix}commands\`.`)
		.addField("Want to invite me to your Discord?", `[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)`)
		.addField(`Need more assistance?`, `[Click here to join the official Tsuyo support server](https://discord.gg/3hbeQgY)`);
		return message.channel.send(embed);
  	}
  
  	if (message.guild) {
    	if (client.tags.has(message.guild.id)) {
      		Object.keys(client.tags.get(message.guild.id)).forEach(tagid => {
        		let tag = client.tags.get(message.guild.id)[tagid];
        
        		if (message.content.toLowerCase() == tag.name.toLowerCase()) message.channel.send(tag.text.replace('@user', '<@' + message.author.id + '>'));
      		});
    	}
		
		// We'll use the key often enough that simplifying it is worth the trouble.
		const key = `${message.guild.id}-${message.author.id}`;

		// Triggers on new users we haven't seen before.
		client.points.ensure(`${message.guild.id}-${message.author.id}`, {
		  user: message.author.id,
		  guild: message.guild.id,
		  points: 0,
		  level: 1
		});

		client.points.inc(key, "points");

		// Calculate the user's current level
		const curLevel = Math.floor(0.2 * Math.sqrt(client.points.get(key, "points")));

		// Act upon level up by sending a message and updating the user's level in enmap.
		if (client.points.get(key, "level") < curLevel) {
		  message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
		  client.points.set(key, curLevel, "level");
		}
  	}
  
  	if (message.content.toLowerCase().indexOf(settings.prefix.toLowerCase()) !== 0) return;
  
  	let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  	let command = args.shift().toLowerCase();
  

  	let level = client.permlevel(message);

  	let cmd = client.commands.get(command) || client.aliases.get(command);

  	if (!client.commands.has(command) && !client.aliases.has(command)) return;
  
  	if (cooled.get(message.author.id)) return message.react('⏳');
  	if (client.permlevel(message) < 6) {
    	cooled.set(message.author.id, true);
    	setTimeout(async () => {
      	cooled.delete(message.author.id);
    	}, 3000);
  	}
  
  	if (!message.guild && cmd.conf.guildOnly) return message.reply('You need to be in a guild to use this command!');

  	if (level < client.levelCache[cmd.conf.permLevel]) {
    	if (settings.noPermissionNotice === 'true') return message.channel.send(`You don't have permission to use this command!
			Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
			This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})!`);
    	else return;
  	}

  	message.author.permLevel = level;

  	message.flags = [];
  	while (args[0] && args[0][0] === '-') {
    	message.flags.push(args.shift().slice(1));
  	}

  	if (!cmd.conf.enabled) return message.reply('This command is not enabled!');
   
  	try {
    	cmd.run(client, message, args, level);
    
    	client.uses.ensure(cmd.help.name, 1);
    	client.uses.inc(cmd.help.name);
  	} catch (err) {
    	message.channel.send('There was an error!\n' + err).catch();
  	}
};
