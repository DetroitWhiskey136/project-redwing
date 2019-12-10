'use strict';

module.exports = {
  DISABLED_EVENTS: [
    'TYPING_START',
  ],
  CLIENT_OPTIONS: {
    fetchAllMembers: true,
    disableEveryone: true,
    disabledEvents: this.DISABLED_EVENTS,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 240,
    messageSweepInterval: 300,
    presence: {
      activity: {
        name: 'you',
        type: 'WATCHING',
      },
    },
    ws: {
      large_threshold: 1000,
    },
  },
};
