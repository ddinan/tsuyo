'use strict';

if (Number(process.version.slice(1).split('.')[0]) < 10) throw new Error('NodeJS 10.0.0 or higher is required. Re-run this with NodeJS 10.0.0+');
if (process.env.PREBOOT) eval(process.env.PREBOOT);

const Discord = require('discord.js');
const Enmap = require('enmap');
const client = new Discord.Client({
  disableEveryone: true,
  disabledEvents: ['TYPING_START']
});
const token = require('./token.json');

client.starttime = new Date().getTime();
client.points = new Enmap({name: "points"});
client.items = new Enmap({name: 'glptmitems'});
client.money = new Enmap({name: 'glptm'});
client.profiles = new Enmap({name: 'profiles'});
client.logins = new Enmap({name: 'logins'});
client.reputation = new Enmap({name: 'reputation'});
client.settings = new Enmap({name: 'settings'});
client.notes = new Enmap({name: 'notes'});
client.bugs = new Enmap({name: 'bugreports'});
client.starboard = new Enmap({name: 'starboardmid'});
client.warns = new Enmap({name: 'warns'});
client.tags = new Enmap({name: 'tags'});
client.uses = new Enmap({name: 'commandpop'});
client.minecooldown = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.liusers = new Discord.Collection();
client.music = {};
client.levelCache = {};

process.env.SESSION_SECRET = '';
for (let i = 0; i <= 1500; i++)
  process.env.SESSION_SECRET += Math.random()
  .toString(16)
  .slice(2, 8)
  .toUpperCase()
  .slice(-6) + i;

client.config = require('./config.js');
require('./modules/_functions')(client);
require('./modules/commands')(client);
require('./modules/events')(client);

for (let i = 0; i < client.config.permLevels.length; i++) {
  let currentlevel = client.config.permLevels[i];
  client.levelCache[currentlevel.name] = currentlevel.level;
}

client.login(token);

module.exports = client;

