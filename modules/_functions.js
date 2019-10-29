const Discord = require('discord.js')

module.exports = (client) => {
  client.permlevel = (message) => {
    let permlvl = 0
    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1)

    while (permOrder.length) {
      const currentLevel = permOrder.shift()

      if (message.guild && currentLevel.guildOnly) continue
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level
        break
      }
    }
    return permlvl
  }

  client.getSettings = (guild) => {
    const defaults = client.config.defaultSettings || {}
    if (!guild) return defaults
    const guildData = client.settings.get(guild) || {}
    const returnObject = {}
    Object.keys(defaults).forEach((key) => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key]
    })
    return returnObject
  }

  client.awaitReply = async (msg, question, limit = 30000) => {
    const filter = m => m.author.id === msg.author.id
    await msg.channel.send(question)
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] })
      return collected.first().content
    } catch (e) {
      return false
    }
  }

  client.clean = async (client, text) => {
    if (text && text.constructor.name == 'Promise') text = await text
    if (typeof evaled !== 'string') text = require('util').inspect(text, { depth: 1 })

    text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(process.env.BOT_TOKEN, client.config.token)

    return text
  }

  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`)
      if (props.init) props.init(client)

      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props)
      })
      return false
    } catch (e) {
      return 'Unable to load command ${commandName}: ${e}'
    }
  }

  client.unloadCommand = async (commandName) => {
    let command
    if (client.commands.has(commandName)) command = client.commands.get(commandName)

    if (!command) return "The command \`${commandName}\` doesn't seem to exist. Try again!"

    await command.conf.aliases.forEach(alias => {
      client.aliases.delete(alias)
    })

    client.commands.delete(command.help.name)

    const mod = require.cache[require.resolve(`../commands/${commandName}`)]
    delete require.cache[require.resolve(`../commands/${commandName}.js`)]
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1)
        break
      }
    }
    return false
  }

  client.wait = require('util').promisify(setTimeout)

  client.truncate = (str, num = 20) => {
    if (str.length > num) return str.slice(0, num) + '...'
    else return str
  }

  client.spoilerify = (ts) => {
    return '||' + ts.replace('||', '\\||') + '||'
  }

  client.Embed = class {
    constructor (type, settings) {
      this.type = type
      this.settings = settings

      this.embed = new Discord.RichEmbed()

      if (this.type !== 'blend') this.embed.setColor('#4699AA')
      else this.embed.setColor('#363942')

      if (this.settings.title) this.embed.setTitle(this.settings.title)
      if (this.settings.url) this.embed.setURL(this.settings.url)
      if (this.settings.timestamp) this.embed.setTimestamp()

      if (this.settings.description) this.embed.setDescription(this.settings.description)

      if (this.settings.fields) {
        this.settings.fields.forEach((field) => {
          if (field == 'blank') this.embed.addBlankField()
          else this.embed.addField(field.title, field.text, field.inline || false)
        })
      }

      if (this.settings.files) this.embed.attachFiles(this.settings.files)

      if (this.settings.footer) this.embed.setFooter(this.settings.footer)

      if (this.settings.image) this.embed.setImage(this.settings.image)
      if (this.settings.thumbnail) this.embed.setThumbnail(this.settings.thumbnail)

      if (this.settings.author) this.embed.setAuthor(this.settings.author.name, this.settings.author.icon || null, this.settings.author.url || null)

      return this.embed
    }
  }

  Object.defineProperty(String.prototype, 'toPropperCase', {
    value: function () {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    }
  })

  Object.defineProperty(Array.prototype, 'average', {
    value: function () {
      return this.reduce((a, b) => a + b, 0) / this.length
    }
  })

  Object.defineProperty(Array.prototype, 'random', {
    value: function () {
      return this[Math.floor(Math.random() * this.length + 1) - 1]
    }
  })

  process.on('uncaughtException', (err) => {
    console.log(err)
    console.log(err.stack)
    client.destroy()
  })

  process.on('unhandledRejection', (err) => {
    console.log(err)
    console.log(err.stack)
  })

  process.on('exit', () => {
    client.destroy()
    client = null
  })
}
