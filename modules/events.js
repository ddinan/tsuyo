//Import modules
const fs = require("fs");
const util = require("util");

//Define variables
const promisify = util.promisify;
const readdir = promisify(fs.readdir);

module.exports = (client) => {
//Get event files
  readdir(__dirname + "/../events/", (err, files) => {
//If there is an error, return the error
    if (err) return client.logger.error(err);

//For each file in the file array run this function
    files.forEach(file => {
//If the file extension (.py, .js, .md) is not js, ignore it
      if (!file.endsWith(".js")) return;

//Make the 'event' variuble the file object
      const event = require(`../events/${file}`);

//Split the file name from the file extention
      let eventName = file.split(".")[0];

//When the event name is ran, Run the event files objects
      client.on(eventName, event.bind(null, client));

//Delete the event cache
      delete require.cache[require.resolve(`../events/${file}`)];

//Log that the event is loading
      client.logger.log(`Loading event: ${eventName}`);
    });
    console.log();
  });
};
