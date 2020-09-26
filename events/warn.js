module.exports = async (client, warn) => {
  if (JSON.stringify(warn).toLowerCase().includes("discordapierror")) return;
  client.logger.log(warn, "warn");
};
