const Star = class {
  constructor(client) {
    this.client = client;
  }

  run(reaction, user) {
    const message = reaction.message;
    const settings = this.client.getSettings(message.guild.id);
    if (reaction.emoji.name !== "⭐") return;
    if (message.guild.channels.find(c => c.name == settings.starboardChannel) == null) return;
    if (message.author.bot) return message.channel.send("You can't star bot messages!");
    if (user.id == message.author.id) return message.channel.send("You can't star your own messages!");
    
    this.client.starboard.ensure(message.id, 0);
    this.client.starboard.inc(message.id);
    
    let embed = new this.client.Embed("normal", {
      title: "Star",
      thumbnail: message.author.avatarURL,
      description: `${user.tag} starred ${message.author.tag}'s message!
⭐ ${this.client.starboard.get(message.id)} | ${message.id}`,
      fields: [
        {
          title: "Author",
          text: `<@${message.author.id}>`
        },
        {
          title: "Channel",
          text: `<#${message.channel.id}>`
        }
      ]
    });
    
    message.guild.channels.find(c => c.name == settings.starboardChannel).send({embed: embed}).catch();
  }
};

module.exports = (client, reaction, user) => {
  new Star(client).run(reaction, user);
};
