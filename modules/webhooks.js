const express = require('express')
const Topgg = require('@top-gg/sdk')
const fetch = require('node-fetch')

const app = express()

const webhook = new Topgg.Webhook('testPassword123')

module.exports = (client) => {
    // Discord Bot List (now top.gg) API, used for communicating server count and receiving vote hooks

    app.post('/vote', webhook.listener(vote => {
        console.log("User with ID " + vote.user + " voted!")
    }))
    app.listen(2245)
    console.log("Ready to log votes.")
}