const fs = require('fs')
const util = require('util')
const promisify = util.promisify
const readdir = promisify(fs.readdir)
const colors = require('colors')

module.exports = (client) => {
  let i = 1

  readdir(__dirname + '/../commands/', (err, files) => {
    if (err) return client.logger.error(err);
    files.forEach((file) => {
      if (!file.endsWith('.js')) return
      const props = require(`../commands/${file}`)
      const commandName = file.split('.')[0]

      console.log(colors.magenta(`Loading command: `) + colors.white(`${commandName}. Command #${i}`))

      client.commands.set(commandName, props)
      props.conf.aliases.forEach((al) => {
        client.aliases.set(al, client.commands.get(commandName))
      })

      i++
    })
  })
}
