const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const { prefix, sent_msg } = require('../config.json');
const colors = require('../lib/colors.json');

const embed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor(colors.blue)
    .setThumbnail("https://imgur.com/VvwXmEI.png")

    .addField("Fun", `\`${prefix}8ball [question]\` - Responds with "yes, no or maybe" or if containing "who", it will randomly select a user in the Discord.\n\`${prefix}beep\` - Boop.\n\`${prefix}cat\` - Sends a random picture of a cat.\n\`${prefix}coin\` - Flips a coin. Great for disputes.\n\`${prefix}gif [query]\` - Searches for a gif based on your query.\n\`${prefix}react [message ID] :emoji:\` - Reacts to [message ID] with :emoji:.\n\`${prefix}rps [rock/paper/scissors]\` - Rock paper scissors.`)

    .addField(`Info`, `\`${prefix}avatar <@user>\` - Shows the avatar of the specified user. If <@user> isn't specified, it will show your avatar instead.\n\`${prefix}commands\` - Shows this menu.\n\`${prefix}embed [msg]\` - Embeds your message.\n\`${prefix}embed-example\` - Shows an example embedded message.\n\`${prefix}help\` - Shows information and a link to the official Cogent Discord.\n\`${prefix}ping\` - Shows your ping in milliseconds.\n\`${prefix}remind [time] [message]\` - Messages you [message] after [time] amount. Use 's' for seconds, 'm' for minutes, 'h' for hours and 'd' for days. If a measurement of time is not specified, the time will be in seconds.\n\`${prefix}server\` - Shows information about the server.\n\`${prefix}whois\` -  Shows information about the specified user. If <@user> isn't specified, it will show your information instead.`)

    .addField(`Moderation`, `\`${prefix}addrole [role name]\` - Creates a new role.\n\`${prefix}kick [@user]\` - Kicks the specified user from the guild.\n\`${prefix}prune [1-99]\` - Deletes specified amount of messages.\n\`${prefix}say [message]\` - Say something as the bot.`);
    

module.exports = {
	name: 'commands',
	execute(message) {
        message.channel.send(embed);
	},
};



