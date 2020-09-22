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

  // Starts the web server/API
  // If dashboard is disabled, skip starting web server
  if (!client.config.dashboardEnabled) {
    console.log(colors.green("Finished setting up the bot.")); return;
  } else {
    require("../modules/web")(client);
  }

};
