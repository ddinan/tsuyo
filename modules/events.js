const fs = require("fs");
const util = require("util");

const promisify = util.promisify;
const readdir = promisify(fs.readdir);

module.exports = (client) => {
    readdir(__dirname + "/../events/", (err, files) => {
        if (err) return client.logger.error(err);

        files.forEach(file => {
            if (!file.endsWith(".js")) return;

            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];

            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`../events/${file}`)];

            client.logger.log(`Loading event: ${eventName}`);
        });
        console.log();
    });
};