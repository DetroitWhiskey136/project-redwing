'use strict';

// const { MessageEmbed } = require('discord.js');
const { BotEvent } = require('@structures');

class DebugEvent extends BotEvent {
  constructor(client) {
    super(client);
  }

  // eslint-disable-next-line no-unused-vars
  on(client, data) {
    const enabled = false;
    if (enabled) {
      console.log(data);
    }
  }
}

module.exports = DebugEvent;
