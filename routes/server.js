const router = require('express').Router()
const client = require('../bot.js')

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/')
  if (!req.session.guilds) return res.redirect('/')
  if (!client.guilds.cache.has(req.query.id)) return res.redirect('/')
  if (!client.guilds.cache.get(req.query.id).members.cache.has(req.session.user.id)) return res.redirect('/')

  res.render('server/members', { user: req.session.user, guild: req.query.id, djsclient: client })
})

router.get('/config', async (req, res) => {
  if (!req.session.user) return res.redirect('/')
  //if (!req.session.guilds) return res.redirect('/')
  if (!client.guilds.cache.has(req.query.id)) return res.redirect('/')

  if (client.guilds.cache.get(req.query.id).members.cache.get(req.session.user.id).hasPermission('ADMINISTRATOR')) return res.redirect('/server/config?id=' + req.query.id)

  res.render('server/config', { user: req.session.user, guild: req.query.id, djsclient: client })
})

router.post('/config', async (req, res) => {
  if (!req.session.user) return res.redirect('/')
  if (!req.session.guilds) return res.redirect('/')
  if (!client.guilds.cache.has(req.query.id)) return res.redirect('/')
  if (!client.guilds.cache.get(req.query.id).members.cache.has(req.session.user.id)) return res.redirect('/')

  if (!client.guilds.cache.get(req.query.id).members.cache.get(req.session.user.id).hasPermission('MANAGE_SERVER')) return console.log("nope")

  client.settings.set(req.query.id, req.body)
  res.render('server/config', { user: req.session.user, guild: req.query.id, djsclient: client })
})

module.exports = router
