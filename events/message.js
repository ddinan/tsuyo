const Discord = require("discord.js");
const colors = require('../lib/colors.json');
const fs = require('fs');
const cooled = new Discord.Collection();

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (client.config.blacklisted.includes(message.author.id)) return;

  let settings;

  if (message.guild) settings = client.getSettings(message.guild.id);
  else settings = client.config.defaultSettings;

  // checks if message mentions the bot, if so responds with prefix
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Help')
      .setColor(colors.default)
      .setThumbnail('https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
      .addField('Commands', `Commands can be found by typing \`${settings.prefix}commands\`.`)
      .addField('Want to invite me to your Discord?', '[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455)')
      .addField('Need more assistance?', '[Click here to join the official Tsuyo support server](https://discord.gg/3hbeQgY)')

      if (message.guild !== null) {
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return
        return message.channel.send(embed)
      }

      return message.channel.send(embed)
  }

  if (message.guild) {
    //const pingWords = require('../modules/pingWords.js')
    //pingWords(client, message)

    /*const blacklist = require('../modules/blacklist.js')
    blacklist(client, message)*/

    const censorship = require('../modules/censorship.js')
    censorship(client, message)

    const points = require('../modules/points.js')
    points(client, message)

    if (client.tags.has(message.guild.id)) {
      Object.keys(client.tags.get(message.guild.id)).forEach(tagid => {
        let tag = client.tags.get(message.guild.id)[tagid];

        if (message.content.toLowerCase() == tag.name.toLowerCase()) message.channel.send(tag.text.replace("@user", "<@" + message.author.id + ">"));
      });
    }
  }

  if (!message.content.toLowerCase().startsWith(settings.prefix.toLowerCase() || client.config.defaultSettings.prefix.toLowerCase())) return;

  let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  let level = client.permlevel(message);

  let cmd = client.commands.get(command) || client.aliases.get(command);

  if (!client.commands.has(command) && !client.aliases.has(command)) return;

  // cooldown stuff
  if (cooled.get(message.author.id)) return message.react("⏳");
  if (client.permlevel(message) < 6) {
    cooled.set(message.author.id, true);
    setTimeout(async () => {
      cooled.delete(message.author.id);
    }, 3000); // three seconds
  }

  if (!message.guild && cmd.conf.guildOnly) return message.channel.send("You need to be in a guild to use this command.");
  if (message.guild && !message.channel.nsfw && cmd.conf.nsfwOnly) return message.channel.send(client.errors.nsfwOnly);

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.noPermissionNotice) return message.channel.send(`You can't use this command!
Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}), but this command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})!`);
    else return;
  }

  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  if (!cmd.conf.enabled && level < 8) return message.channel.send("This command is disabled for non-devs."); //this command is disabled for non-devs

  try {
    cmd.run(client, message, args, level);
    client.uses.ensure(cmd.help.name, 1);
    client.uses.inc(cmd.help.name); // for metrics
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};
