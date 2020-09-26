const Discord = require("discord.js");

module.exports = (client, emoji) => {
  let settings = client.getSettings(emoji.guild.id);
  if (settings.logEmojiUpdates == "true") {
    let modLogChannel = settings.modLogChannel;

    if (modLogChannel && emoji.guild.channels.find(c => c.name === settings.modLogChannel)) {
      let embed = new Discord.MessageEmbed()
      .setTitle("Emoji Delete")
      .setColor("#eeeeee")
      .setDescription(`Name: ${emoji.name}\nID: ${emoji.id}`)
      .addField("Emoji URL", emoji.url);

      emoji.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
    }
  }
};