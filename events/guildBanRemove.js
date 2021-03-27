const Discord = require("discord.js");
const colors = require('../lib/colors.json')

module.exports = (client, guild, user) => {
    const settings = client.getSettings(guild.id);
    const modLogChannel = settings.modLogChannel;

    if (modLogChannel && guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
        let embed = new Discord.MessageEmbed()
            .setTitle("User unbanned")
            .setColor(colors.green)
            .setDescription(`Name: ${user.username}\nID: ${user.id}`);

        guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed);
    }
};