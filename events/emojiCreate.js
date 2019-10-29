const Discord = require('discord.js')

module.exports = (client, emoji) => {
  const settings = client.getSettings(emoji.guild.id)
  if (settings.logEmojiUpdates == 'true') {
    const modLogChannel = settings.modLogChannel

    if (modLogChannel && emoji.guild.channels.find(c => c.name === settings.modLogChannel)) {
      const embed = new Discord.RichEmbed()
        .setTitle('Emoji Create')
        .setColor('#eeeeee')
        .setDescription(`Name: ${emoji.name}\nID: ${emoji.id}`)
        .addField('Emoji URL', emoji.url)

      emoji.guild.channels.find(c => c.name === settings.modLogChannel).send(embed)
    }
  }
}
