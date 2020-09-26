const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.cache.cache.get(args[0])
  if (!user) return message.channel.send('You must mention someone or give their ID!')
  if (user.bot === true) return message.channel.send('Don\'t marry bots. They have no feelings... trust me...')
  if (user === message.author || message.author.id === user.id) return message.channel.send('It really do be like that sometimes...')

  let proposerID = message.author.id
  let proposerName = message.author.username
  
  client.lifer.ensure(user.id, {
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
  })
  
  const rings = client.inventory.cache.cache.get(message.author.id, 'rings')
  const spouse = client.life.cache.cache.get(message.author.id, 'spouse')
  const uSpouse = client.life.cache.cache.get(user.id, 'spouse')
  
  if (rings === 0) return message.channel.send('You do not have a wedding ring. Buy one in the shop.')
  if (spouse !== 0) return message.channel.send('You cannot have more than one spouse.')
  if (uSpouse !== 0) return message.channel.send(`${user.tag} already has a spouse.`)

  let embed = new Discord.MessageEmbed()
    .setDescription(`**${user.tag}**, **${message.author.tag}** is asking for your hand in marriage, would you like to accept?`)
  
  const noEmoji = message.client.emojis.cache.cache.get('637573919204966410')
  message.channel.send(embed).then(message => {
    message.react('✅').then(() => message.react(noEmoji));

    const filter = (reaction, sent) => {
      return ['✅', noEmoji].includes(reaction.emoji.name) && sent.id === user.id;
    };

	const proposer = message.guild.members.cache.cache.get("id", proposerID)
	
    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first()

        if (reaction.emoji.name === '✅') {
          client.life.set(proposerID, user.id, 'spouse')
          client.life.set(user.id, proposerID, 'spouse')
          client.inventory.set(proposerID, rings - 1, 'rings')

          embed.setDescription(`${user.tag} and ${proposer.user.tag} are now married`)
            .setImage('https://media.giphy.com/media/vTfFCC3rSfKco/giphy.gif')
            .setColor(colors.pink)
          message.channel.send(embed)
        }
        if (reaction.emoji.id === '637573919204966410') { // No emoji
          embed.setTitle(`Sorry **${proposer.user.tag}**, **${user.tag}** declined your proposal.`)
          message.edit(embed)
        }
      })
      .catch(collected => {
        message.channel.send(`Sorry ${proposer.user.tag}, the person you proposed to didn't respond, try again later.`)
    });
  })
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
