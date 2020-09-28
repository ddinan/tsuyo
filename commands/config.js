const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  try {
    const settings = client.getSettings(message.guild.id)
    const defaults = client.config.defaultSettings
    const overrides = client.settings.get(message.guild.id)
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, client.config.defaultSettings)

    if (args[0] === 'edit') {
      if (!args[1]) return message.channel.send('Please specify a key to edit.')
      if (!defaults[args[1]]) return message.channel.send(args[1] + ' does not exist in the settings!')
      const joinedValue = args.join(' ')
      if (joinedValue.length < 1) return message.channel.send('Please specify a new value.')
      if (joinedValue === settings[args[1].slice(2)]) return message.channel.send('This setting already has that value!')

      if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {})

      if (args[1] == 'modLogChannel' || args[1] == 'welcomeChannel') client.settings.set(message.guild.id, args.slice(2).join(' ').replace('#', '').trim(), args[1])
      else client.settings.set(message.guild.id, args.slice(2).join(' '), args[1])

      message.channel.send(`${args[1]} successfully edited to ${args.slice(2).join(' ')}!`)
    } else

    if (args[0] === 'del' || args[0] === 'reset') {
      if (!args[1]) return message.channel.send('Please specify a key to reset.')
      if (!defaults[args[1]]) return message.channel.send(args[1] + ' does not exist in the settings!')
      if (!overrides[args[1]]) return message.channel.send('This key does not have an override and is already using defaults.')

      const response = await client.awaitchannel.send(message, `Are you sure you want to reset ${args[1]} to the default value?`)

      if (['y', 'yes', '1'].includes(response.toLowerCase())) {
        client.settings.delete(message.guild.id, args[1])
        message.channel.send(`${args[1]} was successfully reset.`)
      } else
      if (['n', 'no', 'cancel', '0'].includes(response)) {
        message.channel.send(`Your setting for \`${args[1]}\` remains at \`${settings[args[1]]}\`.`)
      }
    } else

    if (args[0] === 'get') {
      if (!args[1]) return message.channel.send('Please specify a key to view.')
      if (!defaults[args[1]]) return message.channel.send(args[1] + ' does not exist in the settings')
      const isDefault = !overrides[args[1]] ? '\nThis is the default global value.' : ''
      message.channel.send(`The value of ${args[1]} is currently ${settings[args[1]]}${isDefault}.`)
    } else {
      let embed = new Discord.MessageEmbed()
        .setTitle('⚙️ Server Settings')
        .setColor(colors.default)
      Object.keys(client.getSettings(message.guild.id)).forEach((setting) => embed = embed.addField(setting, settings[setting], true))

      await message.channel.send(embed)
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();
  }
}

exports.conf = {
  enabled: true,
  aliases: ['setting', 'settings', 'conf', 'set', 'setconf', 'configure'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'config',
  category: 'Admin',
  description: 'View or change the settings for your server.',
  usage: 'config <get/edit/reset> <setting> <value>'
}
