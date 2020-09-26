const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const Canvas = require('canvas')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const member = message.mentions.members.first() ? message.mentions.members.first() : message.member

  client.reputation.ensure(`${member.id}`, {
    member: member.id,
    reputation: 0
  })

  const rep = client.reputation.get(`${member.id}`, 'reputation')

  const canvas = Canvas.createCanvas(850, 256)
  const ctx = canvas.getContext('2d')

  // Fill background
  ctx.fillStyle = '#202126'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Profile picture
  const pic = member.user.displayAvatarURL() === null ? 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png' : member.user.displayAvatarURL()

  const avatar = await Canvas.loadImage(pic)
  ctx.drawImage(avatar, 0, 0, 256, 256)

  // Description box
  ctx.fillStyle = '#1A191F'
  ctx.fillRect(277, 22, 550, 145)

  // Name
  ctx.font = 'bold 60px Arial'
  ctx.fillStyle = member.displayHexColor
  ctx.fillText(member.displayName, 300, 80)

  // Description
  ctx.font = '24px Arial'
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('Insert description here.', 300, 110)

  // Triangle on description box
  ctx.beginPath()
  ctx.moveTo(265, 75)
  ctx.lineTo(277, 100)
  ctx.lineTo(277, 50)
  ctx.closePath()
  ctx.fillStyle = '#1A191F'
  ctx.fill()

  // Rep banner
  ctx.rotate(-30 * Math.PI / 180)
  ctx.fillStyle = '#7289DA'
  ctx.fillRect(-45, 40, 200, 35)

  // Rep text
  ctx.font = '25px Arial'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(`+${rep}rep`, -27, 65)
  ctx.rotate(0 * Math.PI / 20)

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'profile.png')
  message.channel.send(attachment)
}

exports.conf = {
  enabled: true,
  aliases: ['p'],
  guildOnly: false,
  permLevel: 'member'
}

exports.help = {
  name: 'profile',
  category: 'Economy',
  description: 'Shows yours or [member]\'s profile.',
  usage: 'profile [member]'
}
