const Discord = require("discord.js");
const colors = require("../lib/colors.json");
const moment = require("moment");
const version = require("discord.js");
const ip = require("ip"); // We're only using this to get the IP of the dashboard, only bot developers can see the IP
require("moment-duration-format");

exports.run = (client, message, args, level) => {
  const duration = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  const port = process.env.port || 3000;
  const embed = new Discord.MessageEmbed()
    .setAuthor("Process Information")
    .setColor(colors.default)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "RAM usage",
      `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
      true
    )
    .addField("Discord.js version", `v${version}`, true)
    .addField("NPM version", `${process.version}`, true)
    .addField("Uptime", `${duration}`, true)
    .addField("Dashboard URL", `${ip.address()}:${port}`, true)
    .addField("Voting listener URL", `${ip.address()}:80`, true)
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  aliases: ["status", "processes"],
  guildOnly: false,
  permLevel: "Bot Developer",
};

exports.help = {
  name: "process",
  category: "Admin",
  description: "Displays informative statistics about usage and webhooks.",
  usage: "process",
};
