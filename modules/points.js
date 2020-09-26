const fs = require("fs");
const Discord = require("discord.js");
const colors = require("../lib/colors.json");

module.exports = (client, message) => {
  if (message.guild === null) return;

  if (client.getSettings(message.guild.id).pointsEnabled === 'true') {
    const key = `${message.guild.id}-${message.author.id}`

    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    })

      client.points.inc(key, 'points')

      const curLevel = Math.floor(0.5 * Math.sqrt(client.points.get(key, 'points')))

      if (client.points.get(key, 'level') < curLevel) {
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`)
        client.points.set(key, curLevel, 'level')
      }
    }
};
