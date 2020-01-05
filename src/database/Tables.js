'use strict';
module.exports = {
  settings: {
    general: {
      prefix: '!',
      system_notice: true,
      warnings_enabled: false,
    },
    admin: {
      admin_role: 'Administrator',
      admin_log: 'admin-log',
    },
    moderator: {
      mod_role: 'Moderator',
      mod_log: 'mod-log',
    },
    welcome: {
      welcome_enabled: false,
      welcome_channel: 'welcome',
      welcome_message: 'We have a new member, lets give them a warm welcome',
    },
    moderation: {
      warns_enabled: false,
      invite_allowed: true,
      warn_log: 'warn-log',
    },
  },
  suggestions: {
    suggestion_id: {
      author: '',
      content: '',
      upvotes: 0,
      downvotes: 0,
      date: '',
    },
  },
  warnings: {
    guild_id: {
      user_id: {
        case_id: {
          reason: '',
          points: 0,
          moderator: '',
          timestamp: '',
        },
      },
    },
  },
  vip: {
    bot_admin: [],
    'bot-support': [],
    donator: [],
  },
};
