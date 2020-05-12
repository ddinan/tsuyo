const router = require('express').Router()
const client = require('../bot.js')

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/')
  if (!req.session.guilds) return res.redirect('/')

  res.render('money', { user: req.session.user, guilds: req.session.guilds, djsclient: client })
})

module.exports = router
