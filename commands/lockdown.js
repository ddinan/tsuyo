const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const ms = require('ms')

exports.run = async (client, message, args, level) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")
    const settings = client.getSettings(message.guild.id);
    const validUnlocks = ['release', 'unlock'];

    var originalChannel

    function unlockChannel(channel) {
        channel.updateOverwrite(channel.guild.roles.everyone, {
            SEND_MESSAGES: null
        }).then(() => {
            clearTimeout(client.lockit[channel.id]);
            delete client.lockit[channel.id];
        })
    }

    function lockChannel(channel) {
        channel.updateOverwrite(message.channel.guild.roles.everyone, {
            SEND_MESSAGES: false
        }).then(() => {
            //originalChannel.send(`Channel locked down for ${ms(ms(args[0]), { long:true })}. To lift, run **${settings.prefix}lockdown ${validUnlocks[Math.floor(Math.random() * validUnlocks.length)]}**`).then(() => {

            client.lockit[channel.id] = setTimeout(() => {
                channel.updateOverwrite(channel.guild.roles.everyone, {
                    SEND_MESSAGES: null
                }).catch(console.error);
                delete client.lockit[channel.id];
            }, ms(args[0]));
        })
    }

    try {
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === settings.modRole.toLowerCase());
        const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === settings.adminRole.toLowerCase());
        // Ensure admin role actually exists

        if (!adminRole) {
            return message.channel.send(lang.NoAdminRole)
        }

        if (!message.member.roles.cache.has(adminRole.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(lang.NoPermission)
        }

        if (!client.lockit) client.lockit = [];
        if (args.length === 0) return message.reply(lang.NoDurationSpecified);

        if (validUnlocks.includes(args[0])) {
            if (args.length > 1) {
                if (args[1] === "all") {
                    message.guild.channels.cache.forEach((channel) => {
                        if (channel.type === "category") return
                        const rolePermissions = channel.permissionsFor(channel.guild.roles.everyone);
                        if (!rolePermissions.has("SEND_MESSAGES")) {
                            return
                        }
                        unlockChannel(channel)
                    });
                }
            } else unlockChannel(message.channel)
        } else {
            if (ms(args[0]) >= 2147483647) return message.reply(lang.InvalidDuration);
            originalChannel = message.channel
            if (args.length > 1) {
                if (args[1] == "all") {
                    message.guild.channels.cache.forEach((channel) => {
                        if (channel.type === "category") return
                        const rolePermissions = channel.permissionsFor(channel.guild.roles.everyone);
                        if (!rolePermissions.has("SEND_MESSAGES")) {
                            return
                        }
                        lockChannel(channel)
                    });
                }
            } else lockChannel(message.channel)
        }
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['lock', 'ld', 'restrict', 'close'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'lockdown',
    category: 'Admin',
    description: 'Forces a channel to go in lockdown.',
    usage: 'lockdown [all]'
}