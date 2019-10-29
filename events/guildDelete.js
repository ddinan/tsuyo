module.exports = (client, guild) => {
  // client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}). Owenr: ${guild.owner.user.tag} (${guild.owner.user.id}).`);

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id)
  }
}
