/* eslint-disable max-len */
'use strict';
const config = require('../../data/config');

const database = require('../database/classes/Settings');
/**
 * PERMISSION LEVELS
 *
 * Permission levels need to be reworked but this is the basics of them
 ** 0  =  non-roled users
 ** 1  =  Blank
 ** 2  =  Moderator
 ** 3  =  Administrator
 ** 4  =  Server Owner
 ** 5  =  Blank
 ** 6  =  Blank
 ** 7  =  Blank
 ** 8  =  Bot Support
 ** 9  =  Bot Admin
 ** 10 =  Bot Owner
 */
const permLevels = [
  // Level 0 ~ Everyone has access
  {
    level: 0,
    name: 'user',
    check: () => true,
  },
  // Level 2 ~ Moderator or higher has access
  {
    level: 2,
    name: 'moderator',
    check: (message) => {
      try {
        const modRole = message.guild.roles.find((r) => r.id === database.fn.settings.getMod(message.guild.id));
        if (modRole && message.member.roles.has(modRole)) return true;
      } catch (e) {
        return false;
      }
    },
  },
  // Level 3 ~ Admin or higher has access
  {
    level: 3,
    name: 'administrator',
    check: (message) => {
      try {
        const adminRole = message.guild.roles.find((r) => r.id === database.fn.settings.getAdmin(message.guild.id));
        if (adminRole && message.member.roles.has(adminRole)) return true;
      } catch (e) {
        return false;
      }
    },
  },
  // Level 4 ~ Guild Owner or higher has access
  {
    level: 4,
    name: 'serverowner',
    check: (message) => {
      if (message.channel.type === 'text') {
        if (message.guild.owner.user.id === message.author.id) return true;
        return false;
      }
      return false;
    },
  },
  // Level 8 ~ Bot Support or higher has acces
  {
    level: 8,
    name: 'botsupport',
    check: (message) => config.support.includes(message.author.id),
  },
  // Level 9 ~ Bot Admin or higher has acces
  {
    level: 9,
    name: 'botadmin',
    check: (message) => config.admins.includes(message.author.id),
  },
  // Level 10 ~ Bot owner has access
  {
    level: 10,
    name: 'botowner',
    check: (message) => message.client.appInfo.owner.id === message.author.id,
  },
];

module.exports = permLevels;
