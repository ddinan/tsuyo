const dblapi = require('dblapi.js')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const get = require('superagent')

module.exports = (client) => {
  const dbl = new dblapi(process.env.DBL_TOKEN, { webhookPort: 80, webhookAuth: process.env.DBL_AUTH })

  dbl.webhook.on('ready', hook => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
  });

  dbl.webhook.on('vote', vote => {
    console.log(`User with ID ${vote.user} just voted!`);
  });
}
