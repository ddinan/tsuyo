const Discord = require('discord.js');

module.exports = (client, oldemoji, newemoji) => {
  let settings = client.getSettings(newemoji.guild.id);
  if (settings.logEmojiUpdates == 'true') {
    let modLogChannel = settings.modLogChannel;

    if (modLogChannel && newemoji.guild.channels.find(c => c.name === settings.modLogChannel)) {
      let embed = new Discord.RichEmbed()
      .setTitle('Emoji Update')
      .setColor('#eeeeee')
      .setDescription(`New Name: ${newemoji.name}\nOld Name: ${oldemoji.name}\nID: ${newemoji.id}`)
      .addField('New Emoji URL', newemoji.url)
      .addField('Old Emoji URL', oldemoji.url);

      newemoji.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
    }
  }
}