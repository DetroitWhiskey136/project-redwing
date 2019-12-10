'use strict';
const { Client } = require('discord.js');
const Database = require('../database/Database');
const path = require('path');

class BotClient extends Client {
  constructor(ClientOptions) {
    super(ClientOptions);
    this.database = new Database(this, path.join(process.cwd(), 'data', 'enmap'));
  }
}

module.exports = BotClient;
