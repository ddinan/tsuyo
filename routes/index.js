const router = require('express').Router()
const client = require('../bot.js')

router.get('/', async (req, res) => {
  res.render('index', { user: req.session.user, guilds: req.session.guilds, djsclient: client })
})

module.exports = router
