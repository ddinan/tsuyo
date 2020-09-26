/*
const fs = require('fs')
const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, message) => {
  if (message.guild === null) return;

    client.guilds.forEach(guild => {
      if (!client.blacklist.has(guild.id) return // Don't create unnecessary data

      const cmds = client.blacklist.cache.get(`${guild.id}`, 'commands')
      // 

      if (message.content.toLowerCase().startsWith(cmd)) { // For early pingwords participants we need to force ping words to be lowercase
        const guild = client.guilds.cache.get(message.guild.id)
        if (message.content.includes('null')) return // DO NOT SEND MESSAGE TO EVERY USER
    }
  })
}*/
