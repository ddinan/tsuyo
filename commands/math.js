const math = require('mathjs')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        if (!args[0]) return message.reply(lang.NoArgumentSpecified)

        message.channel.send(`**${lang.Answer}:** ${math.eval(args.join(' '))}`)
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['calc', 'maths', 'solve'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'math',
    category: 'Utility',
    description: 'Solves <equation> for you',
    usage: 'math <equation>'
}