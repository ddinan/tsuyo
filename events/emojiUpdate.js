const Discord = require("discord.js"); 

module.exports = (client, oldemoji, newemoji) => {
  let settings = client.getSettings(newemoji.guild.id); // Get settings
  if (settings.logEmojiUpdates == "true") { // If the "log emoji update" setting is set to true, then we should do this.
    let modLogChannel = settings.modLogChannel; // Set the logging channel

    if (modLogChannel && newemoji.guild.channels.find(c => c.name === settings.modLogChannel)) {
      let embed = new Discord.MessageEmbed() // Create embed
      .setTitle("Emoji Update") // Set embed title
      .setColor("#eeeeee") // Set color in HEX
      .setDescription(`New Name: ${newemoji.name}\nOld Name: ${oldemoji.name}\nID: ${newemoji.id}`) // Description of the embed
      .addField("New Emoji URL", newemoji.url) // URL link to the New™ Emoji® 
      .addField("Old Emoji URL", oldemoji.url); // Url link to the old Emoji® 

      newemoji.guild.channels.find(c => c.name === settings.modLogChannel).send(embed); // And then we send all that to the logging channel.
    }
  }
};

// comments by odysssssssssssssssssssssssssssssssssssssssssssssssssssey346
