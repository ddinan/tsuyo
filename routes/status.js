const router = require('express').Router()
const djsclient = require('../bot.js')
const moment = require('moment')
require('moment-duration-format')

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/')
  if (!req.session.guilds) return res.redirect('/')

  require('pidusage')(process.pid, (err, stats) => {
    const duration = moment.duration(djsclient.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
    res.render('status', {
      user: req.session.user,
      stats: {
        uptime: `${duration}`,
        users: `${djsclient.users.cache.size}`,
        servers: `${djsclient.guilds.cache.size.toLocaleString()}`,
        channels: `${djsclient.channels.cache.size.toLocaleString()}`,
        status: `${djsclient.user.presence.status}`,
        game: `${djsclient.user.presence.game}`,
      }
    })
  })
})

module.exports = router
