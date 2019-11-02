const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  const input = args[0]
  if (input == 'rock' || input == 'paper' || input == 'scissors') {
    const result = [
      'rock',
      'paper',
      'scissors'
    ]

    const picker = Math.floor(Math.random() * result.length)
    if (input == 'rock' && result[picker] == 'rock') {
      message.channel.send('I chose :punch: too!\n**It was a tie**!')
    } else if (input == 'paper' && result[picker] == 'paper') {
      message.channel.send('I chose :raised_hand: too!\n**It was a tie**!')
    } else if (input == 'scissors' && result[picker] == 'scissors') {
      message.channel.send('I chose :v: too!\n**It was a tie**!')
    }

    // If bot wins

    else if (input == 'scissors' && result[picker] == 'rock') {
      message.channel.send('I chose :punch:\n**I win**!')
    } else if (input == 'rock' && result[picker] == 'paper') {
      message.channel.send('I chose :raised_hand:\n**I win**!')
    } else if (input == 'paper' && result[picker] == 'scissors') {
      message.channel.send('I chose :v:\n**I win**!')
    }

    // If bot loses

    else if (input == 'rock' && result[picker] == 'scissors') {
      message.channel.send('I chose :v:\n**You win**!')
    } else if (input == 'paper' && result[picker] == 'rock') {
      message.channel.send('I chose :punch:\n**You win**!')
    } else if (input == 'scissors' && result[picker] == 'paper') {
      message.channel.send('I chose :raised_hand:\n**You win**!')
    }
  } else {
    message.channel.send(`**INVALID SYNTAX:** ${prefix}rps [rock/paper/scissors]`)
  }
}

exports.conf = {
  enabled: true,
  aliases: ['psr', 'spr'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'rps',
  category: 'Utility',
  description: 'Simple game of Rock Paper Scissors.',
  usage: 'rps <option>'
}
