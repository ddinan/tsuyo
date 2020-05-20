const zaq = require("zaq");
const Discord = require("discord.js");
const beautify = require("js-beautify").js;
const moment = require("moment");
if (!process.env.LOG_WEBHOOK_ID || !process.env.LOG_WEBHOOK_TOKEN) return;

const webhook = new Discord.WebhookClient(
  process.env.LOG_WEBHOOK_ID,
  process.env.LOG_WEBHOOK_TOKEN
);
const Tsuyo = zaq.as("Tsuyo");

exports.log = (content, type = "log") => {
  const timestamp = `${moment().format("YYYY/MM/DD HH:mm:ss")}`;
  switch (type) {
    case "log":
      return Tsuyo.info(content);
      break;
    case "warn":
      Tsuyo.warn(
        beautify(content, { indent_size: 2, space_in_empty_paren: true }),
        {
          executionTime: timestamp,
          sessionId: process.pid,
        }
      );

      return webhook.send("Warn:\n" + content);
      break;
    case "error":
      return Tsuyo.err(content);
      break;
    case "debug":
      return Tsuyo.debug(
        beautify(content, { indent_size: 2, space_in_empty_paren: true })
      );
      break;
    case "ready":
      return Tsuyo.ok(
        beautify(content, { indent_size: 2, space_in_empty_paren: true })
      );
      break;
    case "user":
      return console.log(`${timestamp} ${content}`);
      break;
    case "time":
      return Tsuyo.time(
        beautify(content, { indent_size: 2, space_in_empty_paren: true }),
        {
          ms: client.ping,
          executionTime: timestamp,
          sessionId: process.pid,
        }
      );
      break;
    default:
      throw new TypeError(
        "Logger type must be either warn, debug, log, ready, time, divider, user or error."
      );
  }
};

exports.error = (args) => this.log(args, "error");

exports.warn = (args) => this.log(args, "warn");

exports.debug = (args) => this.log(args, "debug");

exports.cmd = (args) => this.log(args, "cmd");
