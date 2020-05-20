module.exports = async (client, error) => {
  if (JSON.stringify(error).toLowerCase().includes("discordapierror")) return;
  client.logger.error(error.stack);
};
