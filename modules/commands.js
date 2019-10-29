const fs = require('fs')
const util = require('util')
const promisify = util.promisify
const readdir = promisify(fs.readdir)

module.exports = (client) => {
  let i = 1

  readdir(__dirname + '/../commands/', (err, files) => {
    if (err) return console.log(err)
    files.forEach((file) => {
      if (!file.endsWith('.js')) return
      const props = require(`../commands/${file}`)
      const commandName = file.split('.')[0]

      console.log(`Loading command: ${commandName}. Command ${i}`)

      client.commands.set(commandName, props)
      props.conf.aliases.forEach((al) => {
        client.aliases.set(al, client.commands.get(commandName))
      })

      i++
    })
  })
}
