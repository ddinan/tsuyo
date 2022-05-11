module.exports = (client, guild) => {
    let channelToSend

    guild.channels.cache.forEach((channel) => {
        if (channel.type === "GUILD_TEXT" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel
    })

    const confetti = client.emojis.cache.get("635377353849176064");

    channelToSend.send(confetti + " **Thanks for adding me!**\nYour server is the `117th` server to invite me.\n\n**Commands**\nAll commands have a default prefix of `;;` but this can be changed to whatever you like. See the **FAQ** section below.\n\n**FAQ**\n`Q` How can I configure the bot to match my server's needs?\n`A` You can change the bot's prefix and many other options through the `;;config` command. For example, `;;config set prefix .` would set the prefix for commands to `.`.\n\n`Q` Is there a dashboard?\n`A` There most certainly is! You can access it via **https://tsuyo.xyz**.\n\n`Q` I have a question, what can I do?\n`A` For starters, be sure to check out `;;help` and `;;faq`. If you still need assistance, please feel free to join our **support server** @ **https://discord.gg/3hbeQgY**.")
}