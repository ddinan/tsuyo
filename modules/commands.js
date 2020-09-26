// Import modules
const fs = require("fs");
const util = require("util");

// Define variables
const promisify = util.promisify;
const readdir = promisify(fs.readdir);

module.exports = (client) => {
  // Get command files
  let i = 1;

  readdir(__dirname + "/../commands/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
};
