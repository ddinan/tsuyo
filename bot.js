// Copyright 2020 Cytrus-RE Developers
// You may use the code, but please do credit us.

"use strict";

// Check if the Node version is 14+
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Tsuyo requires Node 12 or higher. Re-run the bot with Node 12 or higher.");
if (process.env.PREBOOT) eval(process.env.PREBOOT); // Execute anything in the preboot variable

// Define NPM modules
const Discord = require("discord.js");
const Enmap = require("enmap");

// Define client
const client = new Discord.Client({
	disableEveryone: true,
	disabledEvents: ["TYPING_START"]
});

// Define time of startup
client.starttime = new Date();

// Define databases/objects
client.profiles = new Enmap({name: "profiles"});
client.logins = new Enmap({name: "logins"});
client.spotify = new Enmap({name: "spotify"});
client.settings = new Enmap({name: "settings"});
client.notes = new Enmap({name: "notes"});
client.bugs = new Enmap({name: "bugreports"});
client.starboard = new Enmap({name: "starboardmid"});
client.warns = new Enmap({name: "warns"});
client.tags = new Enmap({name: "tags"});
client.points = new Enmap({ name: "points" });
client.pingwords = new Enmap({ name: "pingwords" });
client.inventory = new Enmap({ name: "inventory" });
client.garden = new Enmap({ name: "garden" });
client.money = new Enmap({ name: "money" });
client.cooldown = new Enmap({ name: "cooldown" });
client.badges = new Enmap({ name: "badges" });
client.reputation = new Enmap({ name: "reputation" });
client.fish = new Enmap({ name: "fish" });
client.flags = new Enmap({ name: "flags" });
client.badges = new Enmap({ name: "badges" });
client.money = new Enmap({ name: "money" });
client.profile = new Enmap({ name: "profile" });
client.life = new Enmap({ name: "life" });
client.tags = new Enmap({ name: "tags" });
client.uses = new Enmap({ name: "commandpop" });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.liusers = new Discord.Collection();
client.music = {};
client.levelCache = {};

// Import files
client.logger = require("./modules/logger");
client.config = require("./config");
client.errors = require("./modules/errors");
require("./modules/commands")(client); // Import command module
require("./modules/events")(client); // Import events module
require("./modules/_functions")(client); // Import functions

// Cache the permissions
for (let i = 0; i < client.config.permLevels.length; i++) {
	let currentlevel = client.config.permLevels[i];
	client.levelCache[currentlevel.name] = currentlevel.level;
}

process.env.SESSION_SECRET = "";
for (let i = 0; i <= 1500; i++) {
  process.env.SESSION_SECRET +=
    Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
}

client.login(process.env.BOT_TOKEN);

console.log("Logged into Discord API!");
// Set status to Loading
//client.user.setStatus("idle");
//client.user.setActivity("Loading...");

module.exports = client;
