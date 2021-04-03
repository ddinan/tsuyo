const fs = require('fs')
const Discord = require('discord.js')

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
    muteThreshold: 7, // Amount of messages sent in a row that will cause a mute
    kickThreshold: 10, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 20, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    muteMessage: '**{user_tag}** has been muted for spamming.', // Message that will be sent in chat upon muting a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredMembers: [], // Array of User IDs that get ignored.
    muteRoleName: "Muted", // Name of the role that will be given to muted users!
    removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
    // And many more options... See the documentation.
});

module.exports = (client, message) => {
    if (message.guild === null) return

    // 0 for off
    const swearList = fs.readFileSync("./lib/swearwords.txt", "utf-8")
    const words = swearList.split("\n")

    if (client.getSettings(message.guild.id).censorSwears === "true") { // Swear words
        if (words.includes(message.content.toLowerCase())) {
            message.delete()
        }
    }

    if (client.getSettings(message.guild.id).censorLinks === "true") { // Invite links
        if (message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discordapp.com/invite") || message.content.toLowerCase().includes("discord.com/invite")) {
            message.delete()
        }
    }

    if (client.getSettings(message.guild.id).censorSpam === "true") { // Spam
        antiSpam.message(message)
    }
}