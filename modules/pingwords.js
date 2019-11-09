const fs = require('fs')
const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, message) => {
  if (message.guild === null) return
  
  const pingEmbed = new Discord.RichEmbed()
    .setColor(colors.teal)
    .setAuthor(`Ping Words`)
    .addField(`${message.guild.name} (#${message.channel.name})`, `<@${message.author.id}>\n${message.content}\n[Click to view message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
    .setTimestamp();

    client.users.forEach(user => {
      if (user.bot) return
      // Ensure this user has ping words
      client.pingwords.ensure(`${user.id}`, {
        user: user.id,
        pingOne: null,
        pingTwo: null,
        pingThree: null
      })

      const pingOne = client.pingwords.get(`${user.id}`, 'pingOne')
      const pingTwo = client.pingwords.get(`${user.id}`, 'pingTwo')
      const pingThree = client.pingwords.get(`${user.id}`, 'pingThree')

      if (message.content.includes(pingOne) || message.content.includes(pingTwo) || message.content.includes(pingThree)) {
        const guild = client.guilds.get(message.guild.id)
        if (!guild.member(user.id)) return // If member is not in the guild, why ping them?
        user.send(pingEmbed).catch((e) => {})
    }
  })
}