const port = process.env.port || 3000;
const ip = require("ip"); // Only gets your IP, does nothing else

const config = {
  "botName": "Tsuyo",
  "owners": ["191517443519152129", "493922020783030282"],
  "devs": [],
  "mods": [],
  "support": [],
  "helpers": [],

  "blacklisted": [""],
  "globalBan": [""],
  "token": "NzM0MTEzMjExNDYwMDkxOTE0.XxM-NA.YarPAgV-rABDlzeh1K76Z-Uuwk0",
  // LINKS:
  "github": "https://github.com/VenkSociety/Tsuyo",
  "supportServer": "https://discord.gg/3hbeQgY",
  "botInvite": "https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455",

  // Dashboard settings
  "dashboardEnabled": false, // Off by default
  "port": port,
  "clientId": process.env.CLIENT_ID,
  "clientSecret": process.env.CLIENT_SECRET,
  "scopes": ["identify", "guilds"],
  "redirectUri": "http://" + ip.address() + ":" + port + "/authorize/callback",

  "defaultSettings" : {
    "prefix": ".",
    "language": "en-US",
    "modLogChannel": "logs",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "muteRole": "Muted",
    "noPermissionNotice": "true",
    "pointsEnabled": "true",
    "deniedChannel": "denied-suggestions",
    "acceptedChannel": "accepted-suggestions",
    "welcomeChannel": "general",
    "welcomeMessage": "Welcome to the server, {{mention}}!",
    "welcomeEnabled": "true",
    "logMessageUpdates": "true",
    "logEmojiUpdates": "true",
    "logMemberUpdates": "true",
    "logModerated": "true",
    "starboardChannel": "starboard",
    "censor": "0",
    "maxWarnsBeforeBan": 3
  },

  permLevels: [
    { level: 0,
      name: "Blacklisted",

      check: () => true
    },

    { level: 1,
      name: "User",

      check: (message) => !config.blacklisted.includes(message.author.id) || !config.globalBan.includes(message.author.id)
    },

    { level: 2,
      name: "Moderator",

      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id) || message.member.hasPermission("MANAGE_MESSAGES")) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",

      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());
          if (message.member.roles.has(adminRole.id) || message.member.hasPermission("ADMINISTRATOR")) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner",

      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    {
      level: 5,
      name: "Bot Helper",

      check: (message) => config.helpers.includes(message.author.id)
    },

    {
      level: 6,
      name: "Bot Support",

      check: (message) => config.support.includes(message.author.id)
    },

    {
      level: 7,
      name: "Bot Moderator",

      check: (message) => config.mods.includes(message.author.id)
    },

    {
      level: 8,
      name: "Bot Dev",

      check: (message) => config.devs.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Owner",

      check: (message) => config.owners.includes(message.author.id)
    }
  ]
};

module.exports = config;
