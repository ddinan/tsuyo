const fs = require('fs');
const Discord = require('discord.js');
const { bot_name, logo, prefix, token, loaded_msg, active_msg, error_msg, default_role, welcome_channel, log_channel } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(loaded_msg);
    client.user.setActivity(active_msg)
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.channel.type === "dm") return; // Ignore DM channels.
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply(error_msg);
	}
});

// client.on('messageDelete', (message) => {
    // const channel = message.guild.channels.find('name', (log_channel));
    // if (!channel) return;
    // message.channel.send(`:no_entry_sign: Deleted message: ${message}`);
// });
          
client.on('message', (message) => {
  if (message.content.startsWith(`${prefix}logo`)) {
      message.channel.send("", {
        file: "./lib/avatar3.png"
      });
  }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', (log_channel));
    if (!channel) return;
    channel.send(`:heavy_check_mark: ${member.user.username} joined the Discord. Total member count: **${member.guild.memberCount}**`);
    
    const welcomechannel = member.guild.channels.find('name', (welcome_channel));
    if (!welcomechannel) return;
    welcomechannel.send(`:airplane: ${member.user.username} joined the Discord.`);
    
    member.addRole(member.guild.roles.find('name', (default_role)))
});

client.login(token);