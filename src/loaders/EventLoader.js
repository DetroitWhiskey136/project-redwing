'use strict';

const { requireDirectory } = require('@utils/FileUtils');
const Loader = require('@structures/Loader');

class EventLoader extends Loader {
  constructor(client) {
    super(client);
  }

  async load() {
    const logs = [];
    await requireDirectory(`${process.cwd()}/data/events`, (BotEvent, fileName) => {
      const event = new BotEvent(this.client);
      logs.push(fileName);
      this.client.on(fileName, (...args) => event.on(this.client, ...args));
    }, console.error);

    this.client.availableLogs = logs;

    return true;
  }
}

module.exports = EventLoader;
