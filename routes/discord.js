const router = require('express').Router();

const { clientId, clientSecret, scopes, redirectUri } = require('../config.js');
const fetch = require('node-fetch');
const FormData = require('form-data');

router.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/');

    const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`;
    res.redirect(authorizeUrl);
});

router.get('/callback', async (req, res) => {
    if (req.session.user) return res.redirect('/');

    const accessCode = req.query.code;

    if (req.query.error === 'access_denied') {
        return res.end('You have cancelled your login via Discord.');
    }

    if (!accessCode) {
        res.end('Login failed, please try it again. (Missing Discord access code)');
        throw new Error('No access code returned from Discord.');
    }

    const data = new FormData();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectUri);
    data.append('scope', scopes.join(' '));
    data.append('code', accessCode);

    try {

        let authTokenRes = await fetch('https://discordapp.com/api/oauth2/token', {
            method: 'POST',
            body: data
        });

        if (!authTokenRes.ok) {
            console.log('Failed to fetch access token from Discord auth server.');
            throw new Error(
                await authTokenRes.text()
            );
        }

        let response = await authTokenRes.json();

        let [userResponse, guildResponse] = await Promise.all(
            [
                fetch('https://discordapp.com/api/users/@me', {
                    method: 'GET',
                    headers: {
                        authorization: `${response.token_type} ${response.access_token}`
                    },
                }),
                fetch('https://discordapp.com/api/users/@me/guilds', {
                    method: 'GET',
                    headers: {
                        authorization: `${response.token_type} ${response.access_token}`
                    }
                })
            ]
        );

        if (!userResponse.ok) {
            console.log('Failed to fetch user info from Discord server.');
            res.end('Failed to login, unable to fetch your basic user info from Discord.');
            throw new Error(
                await userResponse.text()
            );
        }

        userResponse = await userResponse.json();

        if (!guildResponse.ok) {
            console.log('Failed to fetch user guild info from Discord');
            res.end('Failed to login, unable to fetch your guild info from Discord.');
            throw new Error(
                await guildResponse.text()
            );
        }

        userResponse.username = `${userResponse.username}`;
        userResponse.id = `${userResponse.id}`;
        userResponse.tag = `${userResponse.discriminator}`;
        userResponse.tagName = `${userResponse.username}#${userResponse.discriminator}`;
        userResponse.avatarURL = userResponse.avatar ? `https://cdn.discordapp.com/avatars/${userResponse.id}/${userResponse.avatar}.png?size=1024` : null;
        req.session.user = userResponse;

        req.session.guilds = guildResponse;
        res.set('credentials', 'include');
        res.redirect('/');

    } catch (err) {
        console.log('Failed to login a user in with Discord credentials.');
        res.end('Fail to login, something terrible has happened.')
        throw new Error(err);
    }


});

router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect('/');
});

module.exports = router;
