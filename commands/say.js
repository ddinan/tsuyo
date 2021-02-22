exports.run = async (client, message, args, level) => {
    try {
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());
        if (!message.member.roles.cache.has(modRole.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You can't use this command!")
        }

        message.delete().catch()
        const msg = args.join(' ')
        message.channel.send(msg)
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['rep'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'say',
    category: 'Moderation',
    description: 'Returns the text you provide.',
    usage: 'say <text>'
}