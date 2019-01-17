const fs = require('fs');
const Discord = require('discord.js');
const { token, bot_name, prefix, logo, loaded_msg, active_msg, error_msg, default_role, welcome_channel, leave_channel, log_channel } = require('./config.json');
const { green, red } = require('./lib/colors.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log('\x1b[35m%s\x1b[0m', 'Cogent bot is now online. If you encounter any errors, please submit to our GitHub issues page via https://github.com/VenkSociety/Cede/issues.');
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

/* Logging deleted messages system, needs more work.

 client.on('messageDelete', (message) => {
     const channel = message.guild.channels.find('name', (log_channel));
     if (!channel) return;
     message.channel.send(`:no_entry_sign: Deleted message: ${message}`);

*/

/* When a member joins the guild */

client.on('guildMemberAdd', member => {
    const embed = new Discord.RichEmbed()
    .setAuthor("Member joined", `${member.user.displayAvatarURL}`)
    .setColor(green)
    .setDescription(`${member.user.username} joined the Discord.\nTotal member count: **${member.guild.memberCount}**`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setTimestamp()
    
    const channel = member.guild.channels.find(channel => channel.name === log_channel);
    if (!channel) return;
    channel.send(embed);
    
    const embed2 = new Discord.RichEmbed()
    .setAuthor("Member joined", `${member.user.displayAvatarURL}`)
    .setColor(green)
    .setDescription(`${member.user.username} joined the Discord.\nTotal member count: **${member.guild.memberCount}**`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setTimestamp()
    
    const welcomechannel = member.guild.channels.find(channel => channel.name === welcome_channel);
    if (!welcomechannel) return;
    welcomechannel.send(embed2);
    
    member.addRole(member.guild.roles.find(role => role.name === default_role))
});

/* When a member leaves the guild */

client.on('guildMemberRemove', member => {
    const embed = new Discord.RichEmbed()
    .setAuthor("Member left", `${member.user.displayAvatarURL}`)
    .setColor(red)
    .setDescription(`${member.user.username} left the Discord or was kicked.\nTotal member count: **${member.guild.memberCount}**`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setTimestamp()
    
    const channel = member.guild.channels.find(channel => channel.name === log_channel);
    if (!channel) return;
    channel.send(embed);
    
    const embed2 = new Discord.RichEmbed()
    .setAuthor("Member left", `${member.user.displayAvatarURL}`)
    .setColor(red)
    .setDescription(`${member.user.username} left the Discord.\nTotal member count: **${member.guild.memberCount}**`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setTimestamp()
    
    const leavechannel = member.guild.channels.find(channel => channel.name === leave_channel);
    if (!leavechannel) return;
    leavechannel.send(embed2);
});

/* When a channel is created */

client.on('channelCreate', channel => {
    const createdChannel = channel;
    if (!channel.guild) return
    const logChannel = channel.guild.channels.find(channel => channel.name === log_channel);
    const embed = new Discord.RichEmbed()
    .setAuthor("Channel created")
    .setColor(green)
    .setDescription(`Created channel ${createdChannel}`)
    .setTimestamp()
    
    if (!logChannel) return;
    logChannel.send(embed);
});

/* When a channel is deleted */

client.on('channelDelete', channel => {
    const deletedChannel = channel;
    const logChannel = channel.guild.channels.find(channel => channel.name === log_channel);
    const embed = new Discord.RichEmbed()
    .setAuthor("Channel deleted")
    .setColor(red)
    .setDescription(`Deleted channel ${deletedChannel}`)
    .setTimestamp()
    
    if (!logChannel) return;
    logChannel.send(embed);
});

client.login(token);