'use strict';

require('dotenv').config();
const { discord: { BotClient }, utils: { Constants: { CLIENT_OPTIONS } } } = require('./');

const client = new BotClient(CLIENT_OPTIONS);

client.on('ready', () => console.log('bot ready!'));
client.login();
