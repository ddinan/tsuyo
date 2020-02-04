const fs = require('fs')
const Discord = require('discord.js')

module.exports = (client, message) => {
  if (message.guild === null) return
  
  // 0 for off
  const swearList = fs.readFileSync("./lib/swearwords.txt", "utf-8")
  const words = swearList.split("\n")
  
  if (client.getSettings(message.guild.id).censor === "1") { // Only swear
    if (words.includes(message.content.toLowerCase() + "\r")) {
       message.delete()
    }
  }
    
  if (client.getSettings(message.guild.id).censor === "2") { // Invite links
    if (message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discordapp.com/invite")) {
      message.delete()
    }
  }
    
  if (client.getSettings(message.guild.id).censor === "3") { // Swear and invite links
    if (message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discordapp.com/invite") || words.includes(message.content.toLowerCase() + "\r")) {
      message.delete()
    }
  }
}
