const Discord = require("discord.js");

module.exports = (client, guild, user) => {
  const settings = client.getSettings(guild.id);
  const modLogChannel = settings.modLogChannel;
  
  if (modLogChannel && guild.channels.find(c => c.name === settings.modLogChannel)) {
    let embed = new Discord.MessageEmbed()
    .setTitle("User Unban")
    .setColor("#eeeeee")
    .setDescription(`Name: ${user.username}\nID: ${user.id}`);

    guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
  }
};