const dblapi = require("dblapi.js");
const express = require("express");
const dash = express();
const verify = express();
const http = require("http");
const server = http.createServer(dash);
const get = require("superagent");
const colors = require("colors");

module.exports = (client) => {
  // Discord Bot List (now top.gg) API, used for communicating server count and receiving vote hooks
  if (!process.env.DBL_TOKEN) return;
  const dbl = new dblapi(process.env.DBL_TOKEN, {
    webhookPort: 80,
    webhookAuth: process.env.DBL_AUTH,
  });

  dbl.webhook.on("ready", (hook) => {
    console.log(colors.magenta(`Top.gg API running at`) + colors.white(`http://${hook.hostname}:${hook.port}${hook.path}`));
  });

  dbl.webhook.on("vote", (vote) => {
    const settings = client.getSettings(channel.guild.id);
    const logs = client.channels.cache.get(settings.modLogChannel);
    if (!logs) return;
    logs.send(`User with ID ${vote.user} just voted!`);
  });
};
