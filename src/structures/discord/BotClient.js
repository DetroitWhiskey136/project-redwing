'use strict';
const { Client, Collection } = require('discord.js');
const Loaders = require('@loaders');
const { Database } = require('@database');
const path = require('path');

class BotClient extends Client {
  constructor(ClientOptions) {
    super(ClientOptions);
    this.events = new Collection;
    this.database = new Database(this, path.join(process.cwd(), 'data', 'enmap'));
    this.loadFiles().catch(console.error);
  }

  async loadFiles() {
    for (const Loader of Object.values(Loaders)) {
      const loader = new Loader(this);
      let result;
      try {
        // eslint-disable-next-line no-await-in-loop
        result = await loader.load();
      } catch (error) {
        console.error(error);
        result = false;
      } finally {
        if (!result && loader.required) {
          console.error(`The following required event is unavailable, ${loader}`);
        }
      }
    }
  }
}

module.exports = BotClient;
