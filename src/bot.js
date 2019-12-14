'use strict';

require('module-alias/register');
require('dotenv').config();

const { BotClient } = require('@structures');
const { Constants: { CLIENT_OPTIONS } } = require('@utils');

// console.log(require('@structures'));

const client = new BotClient(CLIENT_OPTIONS);
client.login();
