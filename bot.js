const config = require('./config.json'); 
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db')
const colors = require('./lib/colors.json');
const Canvas = require('canvas');
const process = require('process');
const ms = require('parse-ms');
const got = require('got');
const moment = require('moment');

const Enmap = require('enmap');
client.points = new Enmap({name: "points"});

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

const defaultSettings = {
  prefix: ";;",
  modLogChannel: "mod-log",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeChannel: "welcome",
  welcomeMessage: "Say hello to {{user}} joined the Discord."
}

client.on('ready', () => {
    console.log('Bot loaded.');
    client.user.setActivity(`in ${client.guilds.size} guilds`);
});

client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
});
  
// Logging

client.on('channelCreate', channel => {
    client.settings.ensure(channel.guild.id, defaultSettings);
	const guildConf = client.settings.ensure(channel.guild.id, defaultSettings);
	const logChannel = channel.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
    const embed = new Discord.RichEmbed()
    .setAuthor("🔨 Channel created")
    .setColor(colors.green)
   	.setDescription(`Created channel ${channel}`)
    .setTimestamp()

    logChannel.send(embed);
});

client.on('channelDelete', channel => {
	client.settings.ensure(channel.guild.id, defaultSettings);
	const guildConf = client.settings.ensure(channel.guild.id, defaultSettings);
	const logChannel = channel.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
    const embed = new Discord.RichEmbed()
    .setAuthor("🗑️ Channel deleted")
    .setColor(colors.red)
    .setDescription(`Deleted channel \`#${channel.name}\``)
    .setTimestamp()
	
    logChannel.send(embed);
});

client.on("guildMemberAdd", member => {
 	client.settings.ensure(member.guild.id, defaultSettings);
	const guildConf = client.settings.ensure(member.guild.id, defaultSettings);
 	let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
	welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag);
	const channel = member.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
    const embed = new Discord.RichEmbed()
   	.setAuthor("✔️ Member joined")
    .setColor(colors.green)
    .setDescription(`**Total member count:** \`${member.guild.memberCount}\`\n<@${member.user.id}> joined the Discord.`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setTimestamp();
	
	channel.send(embed);
});

client.on('guildMemberRemove', member => {
	const guildConf = client.settings.ensure(member.guild.id, defaultSettings);
    const channel = member.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
    const embed = new Discord.RichEmbed()
    .setAuthor("❌ Member left")
    .setColor(colors.red)
    .setDescription(`**Total member count:** \`${member.guild.memberCount}\`\n<@${member.user.id}> left the Discord.`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setTimestamp();
	
	channel.send(embed);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	const guild = newMember.guild;
	client.settings.ensure(oldMember.guild.id, defaultSettings);
	const guildConf = client.settings.ensure(oldMember.guild.id, defaultSettings);
	const logChannel = oldMember.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
	
	const username = new Discord.RichEmbed()
    .setAuthor("👤 Username changed")
    .setColor(colors.teal)
    .setDescription(`<@${newMember.id}> changed their username`)
	.addField(`Old username`, `${oldMember.username}`, true)
	.addField(`New username:`, `${newMember.username}`, true)
	.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    .setTimestamp();
	
	const nickname = new Discord.RichEmbed()
    .setAuthor("👤 Nickname changed")
    .setColor(colors.teal)
    .setDescription(`<@${newMember.id}> changed their nickname`)
	.addField(`Old nickname:`, `${oldMember.nickname !== null ? `${oldMember.nickname}` : oldMember.username}`, true)
	.addField(`New nickname:`, `${newMember.nickname !== null ? `${oldMember.nickname}` : oldMember.username}`, true)
	.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    .setTimestamp();
	
 	var Changes = {
    	unknown: 0,
    	addedRole: 1,
    	removedRole: 2,
    	username: 3,
    	nickname: 4
  	}
	
	var change = Changes.unknown;

	var removedRole = '';
	function lostRole(value) {
		if (newMember.roles.find(role => role.id === value.id) === null) {
			change = Changes.removedRole;
      		removedRole = value.name;
		}
	}

	var addedRole = '';
	function gainedRole(value) {
		if (oldMember.roles.find(role => role.id === value.id) === null) {
			change = Changes.addedRole;
      		addedRole = value.name;
		}
	}

  	if (newMember.user.username != oldMember.user.username) {
    	change = Changes.username;
  	}

  	if (newMember.nickname != oldMember.nickname) {
    	change = Changes.nickname;
  	}
	
	// For some reason Discord triggers the embed as empty. We can use this character [ ឵឵] to bypass it
	
	const roleAdd = new Discord.RichEmbed()
    .setAuthor("👤 Member roles updated")
    .setColor(colors.teal)
    .setDescription(`\Roles updated for <@${newMember.id}>`)
	.addField(`Gained role:`, ` ឵឵${addedRole}`, true)
	.addField(`All roles:`, ` ឵឵${newMember.roles.map(r => `${r}`).join(' | ')}`, true)
	.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    .setTimestamp();
	
	const roleDel = new Discord.RichEmbed()
    .setAuthor("👤 Member roles updated")
    .setColor(colors.teal)
    .setDescription(`\Roles updated for <@${newMember.id}>`)
	.addField(`Lost role:`, ` ឵឵${removedRole}`, true)
	.addField(`All roles:`, ` ឵឵${newMember.roles.map(r => `${r}`).join(' | ')}`, true)
	.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    .setTimestamp();
	
	// Role checking doesn't work for some reason, it goes to 0 instead of 1 or 2
	
    switch (change) {
      case Changes.unknown:
        logChannel.send('**[User Update]** ' + newMember);
        break
      case Changes.addedRole:
        logChannel.send(roleAdd);
        break
      case Changes.removedRole:
        logChannel.send(roleDel);
        break
      case Changes.username:
        logChannel.send(username);
        break
      case Changes.nickname:
        logChannel.send(nickname);
        break
    }
})

client.on('messageDelete', function(message) {
	if (message.channel.type == "dm") return;
	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
    const channel = message.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
	
    const embed = new Discord.RichEmbed()
    .setAuthor("🗑️ Message deleted")
    .setColor(colors.teal)
    .setDescription(`Message deleted by <@${message.author.id}> in ${message.channel}`)
	.addField(`Message:`, `${message}`)
    .setTimestamp();
	
	channel.send(embed);
});

client.on('messageUpdate', function(oldMessage, newMessage) {
	if (oldMessage.channel.type == "dm") return;
	const guildConf = client.settings.ensure(oldMessage.guild.id, defaultSettings);
    const channel = oldMessage.guild.channels.find(channel => channel.name === guildConf.modLogChannel);

    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
		const embed = new Discord.RichEmbed()
    	.setAuthor("📝 Message updated")
    	.setColor(colors.teal)
    	.setDescription(`Message edited by <@${newMessage.author.id}> in ${oldMessage.channel}`)
		.addField(`Old message:`, `${oldMessage}`, true)
		.addField(`New message:`, `${newMessage}`, true)
        .setTimestamp();
	
		channel.send(embed);
    }
});

// Commands

client.on("message", async (message) => {
	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
	let adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
	let modRole = message.guild.roles.find(role => role.name === guildConf.modRole);
	
	if (message.content.startsWith(`<@492871769485475840>`)) {
		const embed = new Discord.RichEmbed()
		.setTitle("Help")
		.setColor(colors.teal)
		.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
		.addField("Commands", `Commands can be found by typing \`${guildConf.prefix}commands\`.`)
		.addField("Want to invite me to your Discord?", `[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)`)
		.addField(`Need more assistance?`, `[Click here to join the official Tsuyo support server](https://discord.gg/3hbeQgY)`);
		
		message.channel.send(embed);
	}
	
  	if (message.author.bot) return;

  	if (message.content.indexOf(guildConf.prefix) !== 0) return;

  	const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g)
  	const cmd = args.shift().toLowerCase();
	
	if (message.guild) {
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
		const curLevel = Math.floor(0.3 * Math.sqrt(client.points.get(key, "points")));

		// Act upon level up by sending a message and updating the user's level in enmap.
		if (client.points.get(key, "level") < curLevel) {
		  message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
		  client.points.set(key, curLevel, "level");
		}

		/* Admin commands */

		if (cmd === "setconf") {
		if (!adminRole) return message.reply(`\`${guildConf.adminRole}\` role not found`);

		if (!message.member.roles.has(adminRole.id)) {
		  return message.reply(`You need the \`${guildConf.adminRole}\` to use this command.`);
		}

		const [prop, ...value] = args;

		if (!client.settings.has(message.guild.id, prop)) {
		  return message.reply("This key is not in the configuration.");
		}

			if (args.length < 2) {
				return message.channel.send("Setting not recognized.");
			}

		client.settings.set(message.guild.id, value.join(" "), prop);

		message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
	  }

		if (cmd === "showconf") {
			let configProps = Object.keys(guildConf).map(prop => {
		  		return `${prop}  :  ${guildConf[prop]}\n`;
			});
			message.channel.send(`The following are the server's current configuration:\`\`\`${configProps}\`\`\``);
	  	}

		/* Staff commands */

		if (cmd === "poll") {
			if (!adminRole) return message.reply(`\`${guildConf.adminRole}\` role not found`);
			if (!modRole) return message.reply(`\`${guildConf.adminRole}\` role not found.`);

			if (message.member.roles.has(adminRole.id) || message.member.roles.has(modRole.id)) {
				const yesEmoji = message.client.emojis.get("568915076913037334");
				const noEmoji = message.client.emojis.get("568915333834866703");

				const input = message.content.split(`${guildConf.prefix}poll `);

				const embed = new Discord.RichEmbed()
				.setTitle("🗳 Poll")
				.setColor(colors.teal)
				.addField(input, `React with either ${yesEmoji} or ${noEmoji} to vote.`, true)
				.setTimestamp();

				if (args.length === 0) {
					message.channel.send(`You need to specify the contents of the poll.\nE.g, \`${guildConf.prefix}poll Does pineapple belong on pizza?\``)
				}

				else {
					message.delete();
					message.channel.send(embed).then(message => {
						message.react(yesEmoji)
						.then(() => message.react(noEmoji));
					});
				}
			}

			else {
				message.reply("You do not have permission to use this command.");
			}
		}

		if (cmd === "kick") {
			let adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
			if (!adminRole) return message.reply("Administrator Role Not Found");

			if (message.member.roles.has(adminRole.id) || message.member.roles.has(modRole.id)) {
				const kickMember = message.mentions.members.first();
				const channel = message.guild.channels.find(channel => channel.name === guildConf.modLogChannel);


				if (!message.guild.me.hasPermission("KICK_MEMBERS")) { // If bot can't manage messages
					message.channel.send("I don't have the `KICK_MEMBERS` permission.");
				} else {
					if (message.mentions.members.size === 0) { // If no member is mentioned 
						message.channel.send("You need to mention a member to kick.");
					} else { // If a member is mentioned
						kickMember.kick(args.join(" ")).then(member => { // What happens after user is kicked // 
							message.channel.send(`Successfully kicked member \`${member.user.username}\` from the guild.`);

							if (channel) { // If logs channel exists

								if (args[1]) {
									const reason = args.replace(`<@${member.user.id}>`, ``);
									const embed = new Discord.RichEmbed()
									.setTitle("🚨 Member kicked")
									.setColor(colors.red)
									.setDescription(`<@${member.user.id}> was kicked by <@${message.author.id}> for:\n\`${reason}\``)
									.setTimestamp();

									channel.send(embed); 
								}

								else {
									const reason = "No reason specified.";
									const embed = new Discord.RichEmbed()
									.setTitle("🚨 Member kicked")
									.setColor(colors.red)
									.setDescription(`<@${member.user.id}> was kicked by <@${message.author.id}> for:\n\`${reason}\``)
									.setTimestamp();

									channel.send(embed); 
								}
							}
						}).catch(err => {
							message.channel.send("I can't kick that person.");
						});
					}
				}
			}
		}

		/* Economy Commands */

		if (cmd === "add") {
			let adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
			if (!adminRole) return message.reply("Administrator Role Not Found");

			if (!message.member.roles.has(adminRole.id)) {
				return message.reply("You're not an admin, sorry!");
			}

			if (!args[0]) return message.reply('Please specify an amount to add.')
			if (isNaN(args[0])) return message.reply('That was not a valid number!')

			let user = message.mentions.users.first() || message.author;
			message.channel.send('Successfully added ' + args[0] + ' to ' + user);
			db.add(`money_${message.guild.id}_${message.author.id}`, args[0]);
		}

		if (cmd === "balance" || cmd === "bal" || cmd === "money") {
			let bal = db.fetch(`money_${message.guild.id}_${message.author.id}`)
			if (bal === null) bal = 0;
			message.channel.send('You have a balance of `' + bal + '`')
		}

		if (cmd === "daily") {
			let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
			let amount = 100

			let daily = await db.fetch(`daily_${message.author.id}`);

			if (daily !== null && timeout - (Date.now() - daily) > 0) {
				let time = ms(timeout - (Date.now() - daily));

				message.channel.send(`You already collected your daily reward, you can come back and collect it in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
			} else {
			let embed = new Discord.RichEmbed()
			.setAuthor(`Daily`, message.author.displayAvatarURL)
			.setColor("GREEN")
			.setDescription(`**Daily Reward**`)
			.addField(`Collected`, amount)

			message.channel.send(embed)
			db.add(`money_${message.author.id}`, amount)
			db.set(`daily_${message.author.id}`, Date.now())

			}
		}

		if (cmd === "give") {
			// Limited to guild owner
			if (message.author.id !== message.guild.ownerID) 
			  return message.reply("You're not the boss of me, you can't do that!");

			const user = message.mentions.users.first() || client.users.get(args[0]);
			if (!user) return message.reply("You must mention someone or give their ID!");

			const pointsToAdd = parseInt(args[1], 10);
			if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

			// Ensure there is a points entry for this user.
			client.points.ensure(`${message.guild.id}-${user.id}`, {
				user: message.author.id,
				guild: message.guild.id,
				points: 0,
				level: 1
			});

			// Get their current points.
			let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
			userPoints += pointsToAdd;


			// And we save it!
			client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

			message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`);
		}

		if (cmd === "leaderboard") {
			// Get a filtered list (for this guild only), and convert to an array while we're at it.
			const filtered = client.points.filter( p => p.guild === message.guild.id ).array();

			// Sort it to get the top results... well... at the top. Y'know.
			const sorted = filtered.sort((a, b) => b.points - a.points);

			// Slice it, dice it, get the top 10 of it!
			const top10 = sorted.splice(0, 10);

			// Now shake it and show it! (as a nice embed, too!)
			const embed = new Discord.RichEmbed()
			.setTitle("Leaderboard")
			.setAuthor(client.user.username, client.user.avatarURL)
			.setDescription("Our top 10 points leaders!")
			.setColor(0x00AE86);
			
			for (const data of top10) {
				embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
			}
			
			return message.channel.send({embed});
		}

		if (cmd === "xp") {
			const key = `${message.guild.id}-${message.author.id}`;
			return message.channel.send(`You currently have ${client.points.get(key, "points")} XP, and are level ${client.points.get(key, "level")}!`);
		}

		if (cmd === "store" || cmd === "shop") {
			let embed = new Discord.RichEmbed()
			.setTitle(`${client.user.tag} Store!`)
			.setDescription(`**Use ${guildConf.prefix}buy [item] to buy!**`)
			.addField(`House`, '`$230,000`')
			.addField(`Tree`, '`1800$`\nGives you the admin role!') // can add up to 25(I believe)
			.setColor("RANDOM")

			message.channel.send(embed);
		}

		/* Fun commands */

		if (cmd === "8ball") {
			const results = ['Yes.', 'No.', 'Maybe.'];
			const result = results[Math.floor(Math.random()*results.length)];
			let input = args.join(" ");

			if (!input) { 
				const embed = new Discord.RichEmbed()
				.setColor(colors.teal)
				.setTitle('Invalid Syntax')
				.setDescription('`/8ball [message]`\n\nIf question contains "who" or "whose", a random member from the guild will be provided.');

				message.channel.send(embed);
			} 

			else {
				if (message.content.includes('who') || message.content.includes('Who')) {
					const member = message.guild.members.random().displayName;
					message.channel.send(`${member}.`);
				} else {
					message.channel.send(result);
				}
			}
		}

		if (cmd === "coin" || cmd === "flipcoin" || cmd === "headsortails") {
			const sides = ["heads", "tails"];
			const side = sides[Math.floor(Math.random()*sides.length)];
			message.channel.send("The coin landed on " + side + ".");
		}

		if (cmd === "gif" || cmd === "giphy") {
			const args = message.content.split(" ").slice(1);
			const api = 'dc6zaTOxFJmzC';
			const res = await got(`https://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(args.join(" "))}`, {json: true});

			if (args.length < 1) 
				return message.channel.send(`You need to specify a gif to search.`);

			if (!res || !res.body || !res.body.data)
				return message.channel.send("@Failed to find a gif that matched your query.");

			const embed = new Discord.RichEmbed()
				.setImage(res.body.data.image_url)
				.setColor(colors.teal)

			return message.channel.send({embed});
		}

		if (cmd === "rps" || cmd === "spr" || cmd === "psr") {
			let input = args[0];

			if (input == "rock" || input == "paper" || input == "scissors") {
				let result = [
					"rock",
					"paper",
					"scissors"
				];

				let picker = Math.floor(Math.random() * result.length);
				if (input == "rock" && result[picker] == "rock") { 
					message.channel.send('I chose :punch: too!\n**It was a tie**!');
				}

				if (input == "paper" && result[picker] == "paper") { 
					message.channel.send('I chose :raised_hand: too!\n**It was a tie**!');
				}

				if (input == "scissors" && result[picker] == "scissors") { 
					message.channel.send('I chose :v: too!\n**It was a tie**!');
				}

				// If bot wins

				if (input == "scissors" && result[picker] == "rock") {
					message.channel.send('I chose :punch:\n**I win**!');
				}

				if (input == "rock" && result[picker] == "paper") {
					message.channel.send('I chose :raised_hand:\n**I win**!');
				}

				if (input == "paper" && result[picker] == "scissors") {
					message.channel.send('I chose :v:\n**I win**!');
				}

				// If bot loses

				if (input == "rock" && result[picker] == "scissors") {
					message.channel.send('I chose :v:\n**You win**!'); 
				}

				if (input == "paper" && result[picker] == "rock") {
					message.channel.send('I chose :punch:\n**You win**!'); 
				}

				if (input == "scissors" && result[picker] == "paper") {
					message.channel.send('I chose :raised_hand:\n**You win**!'); 
				}

			} else {
				message.channel.send(`**INVALID SYNTAX:** ${guildConf.prefix}rps [rock/paper/scissors]`);
			}
		}

		if (cmd === "react") {
			let id = args[0]
			let emoji = args[1];

			if (!id) {
				const embed = new Discord.RichEmbed()
				.setColor(colors.teal)
				.setTitle('Invalid Syntax')
				.setDescription('`/react [message ID] :emoji:`\n\nRemember to use `:emoji:` instead of just `emoji`.');

				message.channel.send(embed);
			}

			else {
				if (emoji) {
					const embed = new Discord.RichEmbed()
					.setColor(colors.teal)
					.setTitle('Invalid Syntax')
					.setDescription('`/react [message ID] :emoji:`\n\nRemember to use `:emoji:` instead of just `emoji`.');

					message.channel.fetchMessage(id)
					.then(function (message) {
						message.react(emoji);
					}) .catch(function(error) {
						message.channel.send(embed);
					})       
				} else {
					message.channel.send(embed);
				}
			}
		}

		/* Information */

		if (cmd === "avatar") {
			const embed = new Discord.RichEmbed() // Embed for when a user isn't mentioned.
				.setColor(colors.teal)
				.setAuthor(message.author.tag, message.author.displayAvatarURL)
				.setTitle("View image")
				.setURL(message.author.displayAvatarURL)
				.setImage(`${message.author.displayAvatarURL}`)

			if (!message.mentions.users.size) {
				return message.channel.send(embed);
			}

			const user = message.mentions.users.first() || message.author;
			const embed2 = new Discord.RichEmbed() // Embed for when a user is mentioned.
				.setColor(colors.teal)
				.setAuthor(message.author.tag, user.displayAvatarURL)
				.setTitle("View image")
				.setURL(user.displayAvatarURL)
				.setImage(`${user.displayAvatarURL}`)

			message.channel.send(embed2);
		}

		if (cmd === "bot" || cmd === "botinfo") {
			const embed = new Discord.RichEmbed()
				.setAuthor("Bot Information")
				.setColor(colors.teal)
				.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
				.addField("Total guilds:", message.client.guilds.size, true)
				.addField("Total members:", `${message.client.users.size}`, true)
				.addField("ID", `${message.client.user.id}`, true)
				.addField("Hosted in", `:flag_us: United States`, true)
				.addField("Uptime", `${process.uptime()}`, true)
				.addField("Created by", `<@191517443519152129>`, true)
				.setTimestamp();

			message.channel.send({embed});
		}

		if (cmd === "cmds" || cmd === "commands" || cmd === "c") {
			const embed = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colors.teal)
			.addField(`Type ${guildConf.prefix}commands [category] to view all commands in that category`, `Valid categories:\n\`admin\`, \`eco\`, \`fun\`, \`info\`, \`mod\``)

			const admin = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField("🔮 Admin Commands", `\`${guildConf.prefix}showconf\` - Shows the settings for the guild.\n\n\`${guildConf.prefix}setconf [setting] [input]\` - Sets [setting] to [input] in the guild you are in.`)

			const eco = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField("💰 Economy Commands", `\`${guildConf.prefix}bal\` - Shows your balance.\n\n\`${guildConf.prefix}daily\` - Claims your daily bonus.\n\n\`${guildConf.prefix}leaderboard\` - Shows the top 10 users in the Discord with the most XP.\n\n\`${guildConf.prefix}Store\` - Shows buyable items.`)

			const fun = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField("🎲 Fun Commands", `\`${guildConf.prefix}8ball [question]\` - Responds with "yes, no or maybe" or if containing "who", it will randomly select a user in the Discord.\n\n\`${guildConf.prefix}coin\` - Flips a coin. Great for disputes.\n\n\`${guildConf.prefix}gif [query]\` - Searches for a gif based on your query.\n\n\`${guildConf.prefix}rps [rock/paper/scissors]\` - Rock paper scissors.`)

			const info = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField(`❓ Information Commands`, `\`${guildConf.prefix}avatar <@user>\` - Shows the avatar of the specified user. If <@user> isn't specified, it will show your avatar instead.\n\n\`${guildConf.prefix}bot\` - Shows info about the bot.\n\n\`${guildConf.prefix}commands [category]\` - Shows all commands in [category].\n\n\`${guildConf.prefix}help\` - Shows information and a link to the official Tsuyo Discord.\n\n\`${guildConf.prefix}info\` -  Shows information about the specified user. If <@user> isn't specified, it will show your information instead.\n\n\`${guildConf.prefix}ping\` - Shows your ping in milliseconds.\n\n\`${guildConf.prefix}remind [time] [message]\` - Messages you [message] after [time]. Use 's' for seconds, 'm' for minutes, 'h' for hours and 'd' for days. If a measurement of time is not specified, the time will be in seconds.\n\n\`${guildConf.prefix}server\` - Shows information about the server.\n\n\`${guildConf.prefix}vote\` - Shows voting links.`)

			const mod = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField("👮 Moderation Commands", `\`${guildConf.prefix}ban [user]\` - Bans [@user] from the guild.\n\n\`${guildConf.prefix}kick [@user]\` - Kicks [@user] from the guild.\n\n\`${guildConf.prefix}mute [@user]\` - Prevents [@user] from talking.\n\n\`${guildConf.prefix}poll [question]\` - Creates a yes or no poll for [input].\n\n\`${guildConf.prefix}prune [1-99]\` - Deletes specified amount of messages.\n\n\`${guildConf.prefix}react [message ID] :emoji:\` - Reacts to [message ID] with :emoji:.\n\n\`${guildConf.prefix}say [message]\` - Say something as the bot.`)

			if (args.length === 0) {
				message.channel.send(embed);
			}

			if (args[0] === "admin" || args === "administration") {
				message.channel.send(admin);
			}

			if (args[0] === "eco" || args === "economy") {
				message.channel.send(eco);
			}

			if (args[0] === "fun") {
				message.channel.send(fun);
			}

			if (args[0] === "info" || args === "information") {
				message.channel.send(info);
			}

			if (args[0] === "mod" || args === "moderation") {
				message.channel.send(mod);
			}
		}

		if (cmd === "donate") {
			const embed = new Discord.RichEmbed()
			.setTitle("Donating")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField(`Want exclusive donator perks and more bot features?`, `[Click here to donate.](https://www.patreon.com/TsuyoBot)`)
			.addField(`Donator Perks`, `💰 \`$5000\`\n💼 \`Donator role\` in the Tsuyo Bot Discord\n🎉 Access to the exclusive \`donator lounge\`\n🎨 Free \`coloured role\` of your choice`);

			message.channel.send(embed);
		}

		if (cmd === "help") {
			const embed = new Discord.RichEmbed()
			.setTitle("Help")
			.setColor(colors.teal)
			.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
			.addField("Commands", `Commands can be found by typing \`${guildConf.prefix}commands\`.`)
			.addField("Want to invite me to your Discord?", `[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)`)
			.addField(`Need more assistance?`, `[Click here to join the official Tsuyo support server](https://discord.gg/3hbeQgY)`);

			message.channel.send(embed);
		}

		if (cmd === "ping") {
			message.channel.send("Loading...").then(msg => msg.edit(msg.createdTimestamp - message.createdTimestamp + "ms"));
		}

		if (cmd === "profile") {
			const applyText = (canvas, text) => {
			const ctx = canvas.getContext('2d');

			// Declare a base size of the font
			let fontSize = 100;
			do {
				// Assign the font to the context and decrement it so it can be measured again
				ctx.font = `${fontSize -= 10}px sans-serif`;
				// Compare pixel width of the text to the canvas minus the approximate avatar size
				} while (ctx.measureText(text).width > canvas.width - 300);

				// Return the result to use in the actual canvas
				return ctx.font;
			};

			  const canvas = Canvas.createCanvas(850, 850);
			  const ctx = canvas.getContext('2d');

			  const background = await Canvas.loadImage('./lib/img/bg-1.png');
			  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			  ctx.strokeStyle = '#46B0FF';
			  ctx.strokeRect(0, 0, canvas.width, canvas.height);

			  // Add an exclamation point here and below
			  ctx.font = applyText(canvas, `${message.member.displayName}`);
			  ctx.fillStyle = '#46B0FF';
			  ctx.fillText(`${message.member.displayName}`, canvas.width / 2.1, canvas.height / 7.5);

			  ctx.beginPath();
			  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
			  ctx.closePath();
			  ctx.clip();

			  const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL);
			  ctx.drawImage(avatar, 25, 25, 200, 200);

			  const attachment = new Discord.Attachment(canvas.toBuffer(), 'profile.png');

			  message.channel.send(attachment);
		}

		if (cmd === "info" || cmd === "i" || cmd === "whois") {
			let user;
			if (message.mentions.users.first()) {
				user = message.mentions.users.first();
			} else {
				user = message.author;
			}

			const member = message.guild.member(user);

			const embed = new Discord.RichEmbed()
			.setColor(colors.teal)
			.setThumbnail(user.avatarURL)
			.setAuthor(`${user.tag}`)
			.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
			.addField("Status:", `${user.presence.status}`, true)
			.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
			.addField("Bot:", `${user.bot}`, true)
			.addField("Joined server:", `${moment.utc(member.joinedAt).format("MMMM Do YYYY")}`, true)
			.addField("Account created:", `${moment.utc(user.createdAt).format("MMMM Do YYYY")}`, true) 
			.addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
			.setFooter(`ID: ${user.id}`)
			message.channel.send({embed});
		}

		if (cmd === "remind" || cmd === "remindme") {
			let reminderTime = args[0]; 

			if (!reminderTime) {
				const embed = new Discord.RichEmbed()
				.setColor(colors.teal)
				.setTitle('Invalid Syntax')
				.setDescription("`/remind [time] [message]`\n\nUse 's' for seconds, 'm' for minutes, 'h' for hours and 'd' for days. If a measurement of time is not specified, the time will be in seconds.");

				message.channel.send(embed);
			} 

			let reminder = args.slice(1).join(" "); 

			if (reminder) {
				const success = new Discord.RichEmbed()
					.setColor(colors.green)
					.setTitle('**SUCCESS:**')
					.setDescription(`I will send you a DM in **${reminderTime}**!`)
					.setTimestamp();

				const fail = new Discord.RichEmbed()
					.setColor(colors.red)
					.setTitle('**FAIL:**')
					.setDescription(`I couldn't send you a DM. Please check to see if you have direct messaging enabled.`)
					.setTimestamp();

				message.channel.send(success);

				setTimeout(function() {
					let remindEmbed = new Discord.RichEmbed()
						.setColor(colors.teal)
						.addField('Reminder:', `${reminder}`)
						.setTimestamp();

					message.author.send(remindEmbed)
					.catch(() => message.channel.send(fail));

				}, ms(reminderTime));
			} else {
				message.channel.send(embed);
			}
		}

		if (cmd === "server" || cmd === "serverinfo") {
			const embed = new Discord.RichEmbed()
				.setAuthor("Server Information")
				.setColor(colors.teal)
				.setThumbnail(`${message.guild.iconURL}`)
				.addField("Server name:", `${message.guild.name}`, true)
				.addField("Owner:", `${message.guild.owner}`, true)
				.addField("Verified:", `${message.guild.verified}`, true)
				.addField("Total members:", `${message.guild.memberCount}`, true)
				.addField("Server ID", `${message.guild.id}`, true)
				.addField("Created", `By **${message.guild.owner}** on ${message.guild.createdAt}`, true)
				.addField("AFK", `**Channel:** ${message.guild.afkChannel}\n **Timeout:** ${message.guild.afkTimeout} seconds.`, true)
				.addField("Region", `${message.guild.region}`, true)
				.setTimestamp();
			// No guild icon
			const embed2 = new Discord.RichEmbed()
				.setAuthor("Server Information")
				.setColor(colors.teal)
				.setThumbnail(`https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png`)
				.addField("Server name:", `${message.guild.name}`, true)
				.addField("Owner:", `${message.guild.owner}`, true)
				.addField("Verified:", `${message.guild.verified}`, true)
				.addField("Total members:", `${message.guild.memberCount}`, true)
				.addField("Server ID", `${message.guild.id}`, true)
				.addField("Created", `By **${message.guild.owner.user}** on ${message.guild.createdAt}`, true)
				.addField("AFK", `**Channel:** ${message.guild.afkChannel}\n **Timeout:** ${message.guild.afkTimeout} seconds.`, true)
				.addField("Region", `${message.guild.region}`, true)
				.setTimestamp();
			if (message.guild.iconURL === null) {
				message.channel.send(embed2);
			}

			else {
				message.channel.send(embed);
			}
		}

		if (cmd === "vote") {
			const embed = new Discord.RichEmbed()
				.setTitle("Voting")
				.setColor(colors.teal)
				.setThumbnail("https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048")
				.addField(`Want to help out?`, `[Click here to vote.](https://discordbots.org/bot/492871769485475840/vote)`)
				.addField(`Rewards`, `💰 \`$200\``);
			message.channel.send(embed);
		}
	}
});

client.login(config.token);
