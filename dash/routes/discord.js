const router = require('express').Router();

const { clientId, scopes, redirectUri } = require('../config.json');
const fetch = require('node-fetch');
const FormData = require('form-data');

router.get('/', async (req, res) => {
  if (req.session.user) return res.redirect('/');

  const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`;
  res.redirect(authorizeUrl);
});

router.get('/callback', async (req, res) => {
  if (req.session.user) return res.redirect('/');
    
  const accessCode = req.query.code;
  if (!accessCode) res.redirect('/');

  const data = new FormData();
  data.append('client_id', clientId);
  data.append('client_secret', process.env.CLIENT_SECRET);
  data.append('grant_type', 'authorization_code');
  data.append('redirect_uri', redirectUri);
  data.append('scope', scopes.join(' '));
  data.append('code', accessCode);

  fetch('https://discordapp.com/api/oauth2/token', {
    method: 'POST',
    body: data
  })
  .then(res => res.json())
  .then(response => {
    fetch('https://discordapp.com/api/users/@me', {
      method: 'GET',
      headers: {
        authorization: `${response.token_type} ${response.access_token}`
      }
    })
    .then(res2 => res2.json())
    .then(userResponse => {
      req.session.user = userResponse;
    });
    
    fetch('https://discordapp.com/api/users/@me/guilds', {
      method: 'GET',
      headers: {
        authorization: `${response.token_type} ${response.access_token}`
      }
    })
    .then(res2 => res2.json())
    .then(guildResponse => {
      req.session.guilds = guildResponse;
      res.redirect('/');
    });
  });
});

router.get('/logout', async(req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;