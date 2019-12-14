'use strict';

const { Requirements, RunStore } = require('@command');

class Command {
  constructor(client, options = {}) {
    this.client = client;
    this.setup(options);
  }

  setup(options) {
    this.name = options.name || 'none';
    this.category = options.category || 'none';
    this.aliases = options.aliases || [];
    this.usage = options.usage || '';
    this.description = options.description || 'none';
    this.cooldown = options.cooldown || 1000;
    this.requirements = options.requirements || {};
    this.responses = options.responses || {};
    this.running = new RunStore();
  }

  // eslint-disable-next-line no-empty-function
  async run() {}

  async _run(context) {
    try {
      const requirements = new Requirements(this.requirements, this.responses);
      await requirements.handle(context);
      await this.run(context);
    } catch (error) {
      this.client.emit('commandError', error, context);
    }
  }
}

module.exports = Command;
