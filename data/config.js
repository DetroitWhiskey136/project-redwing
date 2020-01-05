/* eslint-disable max-len */
'use strict';
const config = {

  /**
   * Bot Admins, level 9 by default.
   *
   * Array of user ID Strings
   */
  admins: ['190324299083546624', '385132696135008259', '211607587232153600'],

  /**
   * Bot Support, Level 8 by default.
   *
   * Array of user ID strings
   */
  support: ['290216832013565973'],

  /**
   * Dash Board will add this later
   */
  dashboard: {
    callbackURL: 'http://localhost:8081/callback',
    sessionSecret: process.env.SESSION_SECRET,
    domain: 'localhost',
    port: 8081,
  },

  // ~~ NOT USED ~~
  /**
   * DEFAULT SETTINGS
   *
   * Default per-server settings. these settings are entered in a database on first load,
   * and are then completely ignored from this file.
   *
   * to modify default settings, use the __*config*__ command.
   *
   * @note DO NOT REMOVE THIS UNTIL YOUR BOT IS LOADED AND FUNCTIONAL.
   */
  defaultSettings: {
    prefix: '!',
    systemNotice: 'true',
    welcomeEnabled: 'false',
    welcomeChannel: 'welcome',
    welcomeMessage: ' We have a new member, lets give him/her a warm welcome',
    adminRole: 'Administrator',
    modRole: 'Moderator',
    modLogChannel: 'mod-log',
  },
};

module.exports = config;
