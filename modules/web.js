const express = require("express");
const request = require("request");
const session = require("express-session");
const bodyParser = require("body-parser");
const colors = require("colors");
const ip = require("ip"); // We're only using this to get the IP of the dashboard, only bot developers can see the IP
const cors = require('cors');
const { cookie } = require('request');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = process.env.PORT || 3000;

const store = new MongoStore({
  url: process.env.MONGODB_HOST,
  autoReconnect: true,
  autoRemove: 'native',
  stringify: false,
});

store.on('error', err => {
  console.log(`Mongo Session Store Error: \n${err}`);
});

const initWeb = (client) => {
  app.set("view engine", "ejs");
  app.set('trust proxy', true);
  app.use(express.static("static"));
  // app.use(
  //   cookieParser()
  // );
  app.use(
    cors({
      credentials: true
    })
  );
  const cookieExpire = 1000 * 60 * 60 * 24 * 7// 1 week
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: cookieExpire,
        secure: false,
        maxAge: cookieExpire,
      },
      store,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", require("../routes/index"));
  app.use("/authorize", require("../routes/discord"));
  app.use("/guild", require("../routes/server"));
  app.use("/money", require("../routes/money"));
  app.use("/me", require("../routes/me"));
  app.use("/servers", require("../routes/servers"));
  app.use("/status", require("../routes/status"));
  app.get("/commands", (req, res) => {
    if (!req.session.user || req.session.guild) res.redirect("/");

    if (req.query.command) {
      if (!client.commands.has(req.query.command))
        return res.redirect("/commands");

      return res.render("command", {
        user: req.session.user,
        guilds: req.session.guilds,
        djsclient: client,
        command: req.query.command,
      });
    } else
      return res.render("commands", {
        user: req.session.user,
        guilds: req.session.guilds,
        djsclient: client,
      });
  });
  app.get("/invite", (req, res) =>
    res.send(
      '<script>window.location.href = "https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455";</script><noscript><a href="https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455">https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455</a></noscript>'
    )
  );

  app.use((req, res) => {
    res.status(404).send({ status: 404, error: "Page Not Found" });
  });

  app.listen(port, () => {
    console.log(
      colors.magenta(
        "Web server running at: " + colors.white(`${ip.address()}:${port}`)
      )
    );
  });

  console.log(colors.green("Finished setting up the bot."));
};

module.exports = initWeb;
