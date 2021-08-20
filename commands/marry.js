const {
    MessageEmbed
} = require('discord.js')

const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
    const language = client.getSettings(message.guild.id).language
    const lang = require("../lib/languages/" + language + ".json")

    try {
        const user = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!user) return message.channel.send(lang.NoUserSpecified)
        if (user.bot === true) return message.channel.send(lang.CannotMarryBots)
        if (user === message.author || message.author.id === user.id) return message.channel.send(lang.CannotMarrySelf)

        let proposerID = message.author.id
        let proposerName = message.author.username

        client.life.ensure(user.id, {
            member: user.id,
            spouse: 0,
            job: 0
        })

        client.life.ensure(message.author.id, {
            member: message.author.id,
            spouse: 0,
            job: 0
        })

        client.inventory.ensure(message.author.id, {
            member: message.author.id,
            rings: 0,
            petfood: 0,
            seeds: 0,
            worms: 0
        })

        const rings = client.inventory.get(message.author.id, 'rings')
        const spouse = client.life.get(message.author.id, 'spouse')
        const uSpouse = client.life.get(user.id, 'spouse')

        if (rings === 0) return message.channel.send(lang.NoWeddingRing)
        if (spouse !== 0) return message.channel.send(lang.MoreSpouses)
        if (uSpouse !== 0) return message.channel.send(`${user.tag} ${lang.AlreadyHasSpouse}`)

        let embed = new MessageEmbed()
            .setDescription(`**${user.tag}**, **${message.author.tag}** ${lang.AskingMarriage}`)

        const noEmoji = message.client.emojis.cache.get('637573919204966410')

        message.channel.send({
            embeds: [embed]
        }).then(message => {
            message.react('✅').then(() => message.react(noEmoji));

            const filter = (reaction, sent) => {
                return ['✅', noEmoji].includes(reaction.emoji.name) && sent.id === user.id;
            };
            client.channels.cache.find(ch => ch.id === args[0])
            const proposer = message.guild.members.cache.find(p => p.id === proposerID)

            message.awaitReactions(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                })
                .then(collected => {
                    const reaction = collected.first()

                    if (reaction.emoji.name === '✅') {
                        client.life.set(proposerID, user.id, 'spouse')
                        client.life.set(user.id, proposerID, 'spouse')
                        client.inventory.set(proposerID, rings - 1, 'rings')

                        embed.setDescription(`${user.tag} ${lang.And} ${proposer.user.tag} ${lang.AreNowMarried}`)
                            .setImage('https://media.giphy.com/media/vTfFCC3rSfKco/giphy.gif')
                            .setColor(colors.pink)

                        message.channel.send({
                            embeds: [embed]
                        })
                    }
                    if (reaction.emoji.id === '637573919204966410') { // Decline emoji
                        embed.setTitle(`${lang.Sorry} **${proposer.user.tag}**, **${user.tag}** ${lang.DeclinedProposal}`)
                        message.edit(embed)
                    }
                })
                .catch(collected => {
                    message.channel.send(`${lang.Sorry} ${proposer.user.tag}, ${lang.DidNotRespond}`)
                });
        })
    } catch (err) {
        const errors = require('../modules/errors.js')
        errors.embedError(err, lang, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['propose', 'preparetoruinyourlife'],
    guildOnly: true,
    permLevel: 'User'
}

exports.help = {
    name: 'marry',
    category: 'Fun',
    description: 'Proposes to <member>.',
    usage: 'marry <member>'
}