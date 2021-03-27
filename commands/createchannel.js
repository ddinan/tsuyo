exports.run = async (client, message, args, level) => {
    try {
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());

        // Ensure mod/admin roles actually exist

        if (!adminRole) {
            return message.channel.send("There is no administrator role. Please set one using `;;config edit adminRole [your role name]`.")
        }

        if (!message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You can't use this command!")
        }
        if (!args[1]) return message.reply('You need to specify the channel type!')
        if (!args[0]) return message.reply('You need to specify the channel name!')

        message.channel.send('I\'ve created the channel!').then(() => {
            message.guild.createChannel(args[1], args[0], []).catch((err) => {
                message.channel.send('There was an error!')
            })
        })
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['crc', 'chanmake'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'createchannel',
    category: 'Moderation',
    description: 'Creates a channel in the server.',
    usage: 'createchannel <voice/text> <name>'
}