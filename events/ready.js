const request = require("request");
const colors = require("colors");

module.exports = async (client) => {
  const statusList = [
    { msg: "outside (JK who does that?)", type: "PLAYING" },
    { msg: "alone :'(", type: "PLAYING" },
    { msg: "with your heart </3", type: "PLAYING" },
    { msg: `with over ${client.users.size} users`, type: "PLAYING" },
    { msg: "who even reads these anyways?", type: "PLAYING" },
    { msg: "the haters hate", type: "WATCHING" },
    { msg: "you (turn around)", type: "WATCHING" },
    { msg: "grass grow", type: "WATCHING" },
    { msg: `over ${client.guilds.size} servers`, type: "WATCHING" },
    { msg: "funny cat videos", type: "WATCHING" },
    {
      msg: "Déjà vu Watching Déjà vu Watching Déjà vu Watching Déjà vu",
      type: "WATCHING",
    },
    { msg: "the world crumble", type: "WATCHING" },
    { msg: "over you from above 👼", type: "WATCHING" },
    { msg: "your conversations", type: "LISTENING" },
  ];

  setInterval(async () => {
    const index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type,
    });
  }, 60000);

  /* setInterval(async () => {
      request('localhost', (err, res, html) => {
        if (err) console.log(err);
      });
    }, 28000); */

    client.user.setStatus("online");

    let users = client.users.cache.size;
    let servers = client.guilds.cache.size;
    let channels = client.channels.cache.size;

    // logs the status
    client.logger.log(`RAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, "ready");
    client.logger.log(`Users: ${users}`, "ready");
    client.logger.log(`Servers: ${servers}`, "ready");
    client.logger.log(`Channels: ${channels}`, "ready");
    client.logger.log(`Running on Node ${process.version.replace(" ", "")}`, "ready");
    client.logger.log(`Running Discord.js v${require("discord.js").version.replace(" ", "")}`, "ready");

    client.logger.log("Running Tsuyo v1.1 | https://github.com/VenkSociety/Tsuyo");
    client.startuptime = new Date().getTime() - client.starttime;
    client.logger.log("It took " + client.startuptime + "ms to start Tsuyo.");

    // Starts the web server/API
    // If dashboard is disabled, skip starting web server
    if (!client.config.dashboardEnabled) {
      console.log(colors.green("Finished setting up the bot.")); return;
    } else {
      require("../modules/web")(client);
    }
};
