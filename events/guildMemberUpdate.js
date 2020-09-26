const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, oldMember, newMember) => {
  let embed
  const settings = client.getSettings(oldMember.guild.id)

  if (!settings.logMemberUpdates == true) return
  if (!settings.modLogChannel) return
  if (!oldMember.guild.channels.cache.find(c => c.name == settings.modLogChannel)) return
  const modLogChannel = oldMember.guild.channels.cache.find(c => c.name == settings.modLogChannel)
  if (!modLogChannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return
  if (!modLogChannel.permissionsFor(oldMember.guild.me).has('SEND_MESSAGES')) return

  if (oldMember.nickname !== newMember.nickname) {
    const embed = new Discord.MessageEmbed()
      .setAuthor('👤 Nickname changed')
      .setColor(colors.default)
      .setDescription(`<@${newMember.id}> changed their nickname`)
      .addField('Old nickname:', `${oldMember.nickname !== undefined ? `${oldMember.nickname}` : oldMember.username}`, true)
      .addField('New nickname:', `${newMember.nickname !== undefined ? `${newMember.nickname}` : oldMember.username}`, true)
      .setThumbnail(`${oldMember.user.displayAvatarURL}`)
      .setTimestamp()

      modLogChannel.send(embed).catch()
  	}

  	if (oldMember.user.name !== newMember.user.name) {
    const embed = new Discord.MessageEmbed()
      .setAuthor('👤 Username changed')
      .setColor(colors.default)
      .setDescription(`<@${newMember.id}> changed their username`)
      .addField('Old username', `${oldMember.username}`, true)
      .addField('New username:', `${newMember.username}`, true)
      .setThumbnail(`${oldMember.user.displayAvatarURL}`)
      .setTimestamp()

      modLogChannel.send(embed).catch()
  	}

  	if (oldMember.roles !== newMember.roles) {
    	let output = ''
    	let outputNew = ''

    	oldMember.roles.cache.forEach(role => {
      	output += '\n' + role.name
    	})

    	newMember.roles.cache.forEach(role => {
      	outputNew += '\n' + role.name
    	})

    	if (output == outputNew) return

    	embed = new Discord.MessageEmbed()
      .setAuthor('👤 Member roles updated')
    	.setColor(colors.default)
    	.setDescription(`\Roles updated for <@${newMember.id}>`)
      .addField('Old roles:', `${output}`, true)
      .addField('New roles:', `឵${outputNew}`, true)
      .setThumbnail(`${oldMember.user.displayAvatarURL}`)
    	.setTimestamp()

    	modLogChannel.send(embed).catch()
  	}
}
