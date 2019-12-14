'use strict';

module.exports = {
  REGEX: {
    REGEX: /[.*+?^${}()|[\]\\]/g,
  },
  COLORS: {
    READY: '#2ecc71',
    ERROR: '#e74c3c',
    WARN: '#FF8C00',
    LOG: 'ff0000',
    DEBUG: '#C46753',
    WELCOME: '7FE8AA',
    LEAVE: '#C72511',
    GENERAL: '3dd0f4',
  },
  CHANNELS: {
    logs: '653673759848529931',
  },
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
