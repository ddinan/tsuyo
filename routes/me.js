const router = require('express').Router()
const client = require('../bot.js')

router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/')
        return
    }
    res.render('me', {
        pageTitle: 'Home - Tsuyo',
        user: req.session.user || null,
        djsclient: client
    })
})

module.exports = router