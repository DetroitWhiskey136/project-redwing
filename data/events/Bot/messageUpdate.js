/* eslint-disable max-len, require-atomic-updates */
'use strict';

const Event = require('@event/Event');

class MessageUpdateEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'messageUpdate',
      description: 'Fires when a message is updated',
      enabled: true,
    });
  }

  // eslint-disable-next-line no-unused-vars
  run(client, oldMessage, newMessage) {
    return null;
  }
}

module.exports = MessageUpdateEvent;
