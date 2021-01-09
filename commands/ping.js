const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
    try {
        const pingEmbed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setFooter('PING')
            .addField(`${message.author.id}`, 'Hello world!')

        const msg = await message.channel.send(pingEmbed)

        const embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setFooter('PONG',
                'https://cdn.discordapp.com/avatars/492871769485475840/29ea7a72135ebde63f8cebd5f82ef42b.webp')

            .addField('Message Trip',
                `${msg.createdTimestamp - message.createdTimestamp}ms`)

        msg.edit(embed)
    } catch (err) {
        message.channel.send(client.errors.genericError + err.stack).catch();
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'ping',
    category: 'Utility',
    description: 'Returns your ping.',
    usage: 'ping'
}