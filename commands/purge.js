exports.run = async (client, message, args, level) => {
    try {
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());
        if (!message.member.roles.cache.has(modRole.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You can't use this command!")
        }
        let num

        if (!isNaN(args[0])) {
            num = parseInt(args[0])

            if (num <= 100 && num > 1) {
                message.delete()
                message.channel.bulkDelete(num)
            } else message.reply('You must enter a number between 2 and 100 for me to clear!')
        } else {
            message.reply('You must enter a number between 2 and 100 for me to clear!')
        }
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: ['clear', 'prune', 'delete', 'del'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'purge',
    category: 'Moderation',
    description: 'Purges the amount of messages you specify.',
    usage: 'purge <2-100>'
}