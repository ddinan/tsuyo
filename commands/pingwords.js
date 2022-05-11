const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (message.author.bot === true) return
        if (!args[0]) return message.channel.send('You need to specify either add/del/list.')

        // Ensure this user has pingwords
        client.pingwords.ensure(`${message.author.id}`, {
            user: message.author.id,
            pingOne: null,
            pingTwo: null,
            pingThree: null
        })

        const pingOne = client.pingwords.get(`${message.author.id}`, 'pingOne')
        const pingTwo = client.pingwords.get(`${message.author.id}`, 'pingTwo')
        const pingThree = client.pingwords.get(`${message.author.id}`, 'pingThree')

        if (args[0] === 'add') {
            if (!args[1]) return message.channel.send('You need to specify what you want your pingword to be.')
            if (!args[2]) return message.channel.send('You need to specify which slot you want the pingword to go in (1-3)')
            if (args[2] === '1' || args[2] === '2' || args[2] === '3') {
                let slot = ''
                if (args[2] === '1') slot = 'pingOne'
                if (args[2] === '2') slot = 'pingTwo'
                if (args[2] === '3') slot = 'pingThree'
                if (args[2] > 3) return message.channel.send('You can only have 3 ping words.')

                client.pingwords.set(`${message.author.id}`, args[1].toLowerCase(), slot)
                let embed = new MessageEmbed()
                    .setAuthor('Ping Words')
                    .setColor(colors.green)
                    .setDescription(`Set your pingword in slot \`${args[2]}\` to \`${args[1].toLowerCase()}\`.`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()
                return message.channel.send({
                    embeds: [embed]
                })
            }

            message.channel.send('You need to specify which slot you want the pingword to go in (1-3)')
        }

        if (args[0] === 'del') {
            if (!args[1]) return message.channel.send('You need to specify a pingword to delete.')
            if (args[1] === '1') {
                if (pingOne === null) return message.channel.send('You do not have a pingword in this slot.')
                client.pingwords.set(`${message.author.id}`, null, 'pingOne')
                let embed = new MessageEmbed()
                    .setAuthor('Ping Words')
                    .setColor(colors.green)
                    .setDescription(`Set your pingword in slot \`${args[1]}\` to \`null\`.`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()
                return message.channel.send({
                    embeds: [embed]
                })
            }

            if (args[1] === '2') {
                if (pingTwo === null) return message.channel.send('You do not have a pingword in this slot.')
                client.pingwords.set(`${message.author.id}`, null, 'pingTwo')

                let embed = new MessageEmbed()
                    .setAuthor('Ping Words')
                    .setColor(colors.green)
                    .setDescription(`Set your pingword in slot \`${args[1]}\` to \`null\`.`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                return message.channel.send({
                    embeds: [embed]
                })
            }

            if (args[1] === '3') {
                if (pingThree === null) return message.channel.send('You do not have a pingword in this slot.')
                client.pingwords.set(`${message.author.id}`, null, 'pingThree')

                let embed = new MessageEmbed()
                    .setAuthor('Ping Words')
                    .setColor(colors.green)
                    .setDescription(`Set your pingword in slot \`${args[1]}\` to \`null\`.`)
                    .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()

                return message.channel.send({
                    embeds: [embed]
                })
            }

            return message.channel.send('You can only have 3 ping words.')

        }

        if (args[0] === 'list') {
            let embed = new MessageEmbed()
                .setAuthor('Ping Words')
                .setColor(colors.default)
                .addField('Slot 1:', pingOne, true)
                .addField('Slot 2:', pingTwo, true)
                .addField('Slot 3:', pingThree, true)
                .setFooter(`${lang.RespondingTo} ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()

            return message.channel.send({
                embeds: [embed]
            })
        }

        message.channel.send('Invalid argument. Argument can either be add, del or list.')
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: false, // PingWords module makes message/commands slow for some reason?
    aliases: ['pw', 'highlight', 'highlights'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'pingwords',
    category: 'Utility',
    description: 'Sends you a message if one of your ping words is sent in chat.',
    usage: 'pingwords <add/del/list>'
}