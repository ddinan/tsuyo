const router = require('express').Router()
const client = require('../../bot')

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/')
  if (!req.session.guilds) return res.redirect('/')

  res.render('api/index', {
    user: req.session.user,
    djsclient: client
  })
})

module.exports = router
