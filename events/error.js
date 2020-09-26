const Discord = require("discord.js");
module.exports = async (client, error) => {
  if (JSON.stringify(error).toLowerCase().includes("discordapierror")) return; 
  client.logger.log(error.message, "error"); // Log error
  client.channels.cache.get("751473673474539560").send(error.message);
};
