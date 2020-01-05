/* eslint-disable no-useless-escape */
'use strict';
module.exports = {
  DISABLED_EVENTS: [
    'TYPING_START',
  ],
  DEFAULTS: {
    prefix: '!',
    systemNotice: 'true',
    welcomeEnabled: 'false',
    welcomeChannel: 'welcome',
    welcomeMessage: ' We have a new member, lets give him/her a warm welcome',
    adminRole: 'Administrator',
    modRole: 'Moderator',
    modLogChannel: 'mod-log',
  },
  REGEX: {
    ROLE_ID: /^[0-9]{16,19}$/,
    ROLE_MENTION: /^(?:<@&)([0-9]{16,19})(?:>)$/,
    USER_ID: /^[0-9]{16,19}$/,
    MEMBER_MENTION: /^(?:<@!?)?([0-9]{16,19})(?:>)?$/,
    REGEX: /[.*+?^${}()|[\]\\]/g,
    DOMAINS: /^https?:\/\/(www\.)?(pastebin|(gist\.)?github|gitlab)\.com\/\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/i,
  },
  CLIENT_OPTIONS: {
    fetchAllMembers: true,
    disableEveryone: true,
    disabledEvents: this.DISABLED_EVENTS,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 240,
    messageSweepInterval: 300,
    ws: {
      large_threshold: 1000,
    },
  },
  PERM_NAMES: {
    user: 'User',
    moderator: 'Moderator',
    administrator: 'Administrator',
    serverowner: 'Server Owner',
    botsupport: 'Bot Support',
    botadmin: 'Bot Admin',
    botowner: 'Bot Owner',
  },
};
