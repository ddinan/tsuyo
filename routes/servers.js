const router = require('express').Router()
const client = require('../bot.js')

router.get('/', async (req, res) => {
  if (!req.session.user) { res.redirect('/'); return }
  if (!req.session.guilds) { res.redirect('/'); return }
  res.render('servers', { user: req.session.user, guilds: req.session.guilds, djsclient: client })
})

module.exports = router
