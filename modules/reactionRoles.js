const fs = require("fs");
const Discord = require("discord.js");
const colors = require("../lib/colors.json");

const client = new ReactionRole(process.env.BOT_TOKEN, process.env.MONGODB_URI);

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.channel.type === `dm`) return;

    const c = await client.channels.fetch(channel);
    const m = await c.messages.fetch(msg);
    await m.react(emoji);
    const option = client.createOption(emoji, [role], add, remove);
    await client.createMessage(channel, msg, 1, option);
    message.reply("created!");
};