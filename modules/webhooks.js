const dblapi = require("top.gg");
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
        webhookPort: 521, // Replace this with whatever port you want to run the webhook on
        webhookAuth: process.env.DBL_AUTH,
    });

    dbl.webhook.on("ready", hook => {
        console.log(colors.magenta(`Top.gg API running at `) + colors.white(`http://${hook.hostname}:${hook.port}${hook.path}`));
    });

    dbl.webhook.on("test", vote => {
        const settings = client.getSettings(channel.guild.id);
        const logs = client.channels.cache.get(settings.modLogChannel);
        console.log("foo")
        if (!logs) return;
        console.log("bar?")
        logs.send(`User with ID ${vote.user} just voted!`);
    });
};