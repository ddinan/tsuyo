const router = require('express').Router()
const client = require('../bot.js')
const moment = require('moment')
require('moment-duration-format')

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/')
  if (!req.session.guilds) return res.redirect('/')

  require('pidusage')(process.pid, (err, stats) => {
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
    res.render('status', {
      user: req.session.user,
      stats: {
        ram: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
        uptime: `${duration}`,
        users: `${client.users.size}`,
        servers: `${client.guilds.size.toLocaleString()}`,
        channels: `${client.channels.size.toLocaleString()}`,
        status: `${client.user.presence.status}`,
        game: `${client.user.presence.game}`,
        discord1js: `v${require('discord.js').version}`,
        cpu_usage: `${Math.round(stats.cpu)}%`,
        node1js: `${process.version}`,
        startup_time: `${client.startuptime}ms`,
        voice_connections: `${client.voiceConnections.size}`,
        dependencies: `${Object.keys(require('../../package').dependencies).length}`
      }
    })
  })
})

module.exports = router
