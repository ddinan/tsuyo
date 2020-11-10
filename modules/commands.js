const fs = require("fs");
const util = require("util");

const promisify = util.promisify;
const readdir = promisify(fs.readdir);

module.exports = (client) => {
  let i = 1;

  readdir(__dirname + "/../commands/", (err, files) => {
    if (err) return client.logger.error(err);

    files.forEach((file) => {
      if (!file.endsWith(".js" || ".ts")) return;

      let props = require(`../commands/${file}`);
      let commandName = file.split(".")[0];

      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
};
