exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    const {
        ReactionRole
    } = require("reaction-role");

    try {
        const emoji = args[0]
        const role = args[1]
        const channel = args[2]
        const msg = args[3]
        const add = args[4]
        const remove = args[5]

        const rr = new ReactionRole(process.env.BOT_TOKEN, process.env.MONGODB_URI);
        const c = await rr.channels.fetch(channel);
        const m = await c.messages.fetch(msg);
        await m.react(emoji);

        const option = rr.createOption(emoji, [role], add, remove);
        await rr.createMessage(channel, msg, 1, option);
        message.reply("created!");
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['rr'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'reactionrole',
    category: 'Utility',
    description: 'Gives a role to a user when they react to a message.',
    usage: 'reactionrole <reaction> <role> <message ID>'
}