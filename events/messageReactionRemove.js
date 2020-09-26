const Star = class {
  constructor(client) {
    this.client = client;
  }

  run(reaction, user) {
    const message = reaction.message;
    const settings = this.client.getSettings(message.guild.id);
    if (reaction.emoji.name !== "⭐") return;
    if (!this.client.starboard.has(message.id)) return;
    if (!message.guild.channels.cache.find(c => c.name == settings.starboardChannel)) return;
    
    if (!this.client.starboard.has(message.id)) this.client.starboard.set(message.id, 0);
    else this.client.starboard.dec(message.id);
    
    let embed = this.client.Embed("normal", {
      title: "UnStar",
      thumbnail: message.author.avatarURL,
      description: `${user.tag} un-starred ${message.author.tag}'s message!
⭐ ${this.client.starboard.get(message.id)} | ${message.id}`,
      fields: [
        {
          title: "Author",
          text: "<@" + message.author.id + ">"
        },
        {
          title: "Channel",
          text: "<#" + message.channel.id + ">"
        }
      ]
    });
    message.guild.channels.cache.find(c => c.name == settings.starboardChannel).send({embed: embed}).catch();
  }
};

module.exports = (client, reaction, user) => {
  new Star(client).run(reaction, user);
};
