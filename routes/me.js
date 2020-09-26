const router = require('express').Router();

router.get('/', (req, res) => {
	if (!req.session.user) { res.redirect('/'); return }
    res.render('me', { pageTitle: 'Home - Tsuyo', user: req.session.user || null });
});

module.exports = router;
