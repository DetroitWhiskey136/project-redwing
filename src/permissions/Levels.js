/* eslint-disable max-len */
'use strict';
const config = require('../../data/config');
const Manager = require('@discord/Manager');

/**
 * PERMISSION LEVELS
 *
 * Permission levels need to be reworked but this is the basics of them
 ** 0  =  non-rolled users
 ** 1  =  Blank
 ** 2  =  Blank
 ** 3  =  Blank
 ** 4  =  Blank
 ** 5  =  Moderator
 ** 6  =  Administrator
 ** 7  =  Server Owner
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
    checkMember: () => true,
  },
  // Level 5 ~ Moderator or higher has access
  {
    level: 5,
    name: 'moderator',
    check: (message) => {
      const role = message.client.database.fn.guild.get(message.guild.id).moderator.modrole;
      if (!role) return false;
      try {
        const modRole = Manager.get(message.guild.roles, role);
        if (modRole && message.member.roles.cache.map((r) => r.id).includes(modRole.id)) return true;
      } catch (e) {
        return false;
      }
    },
    checkMember: (member) => {
      const role = member.client.database.fn.guild.get(member.guild.id).moderator.modrole;
      if (!role) return false;
      try {
        const modRole = Manager.get(member.guild.roles, role);
        if (modRole && member.roles.cache.map((r) => r.id).includes(modRole.id)) return true;
      } catch (e) {
        return false;
      }
    },
  },
  // Level 6 ~ Admin or higher has access
  {
    level: 6,
    name: 'administrator',
    check: (message) => {
      const role = message.client.database.fn.guild.get(message.guild.id).admin.adminrole;
      if (!role) return false;
      try {
        const adminRole = Manager.get(message.guild.roles, role);
        if (adminRole && message.member.roles.cache.map((r) => r.id).includes(adminRole.id)) return true;
      } catch (e) {
        return false;
      }
    },
    checkMember: (member) => {
      const role = member.client.database.fn.guild.get(member.guild.id).admin.adminrole;
      if (!role) return false;
      try {
        const adminRole = Manager.get(member.guild.roles, role);
        if (adminRole && member.roles.cache.map((r) => r.id).includes(adminRole.id)) return true;
      } catch (e) {
        return false;
      }
    },
  },
  // Level 7 ~ Guild Owner or higher has access
  {
    level: 7,
    name: 'serverowner',
    check: (message) => {
      if (message.channel.type === 'text') {
        if (message.guild.owner.user.id === message.author.id) return true;
        return false;
      }
      return false;
    },
    checkMember: (member) => {
      if (member.guild.owner.user.id === member.id) return true;
      return false;
    },
  },
  // Level 8 ~ Bot Support or higher has access
  {
    level: 8,
    name: 'botsupport',
    check: (message) => config.support.includes(message.author.id),
    checkMember: (member) => config.support.includes(member.id),
  },
  // Level 9 ~ Bot Admin or higher has access
  {
    level: 9,
    name: 'botadmin',
    check: (message) => config.admins.includes(message.author.id),
    checkMember: (member) => config.admins.includes(member.id),
  },
  // Level 10 ~ Bot owner has access
  {
    level: 10,
    name: 'botowner',
    check: (message) => message.client.appInfo.owner.id === message.author.id,
    checkMember: (member) => member.client.appInfo.owner.id === member.id,
  },
];

module.exports = permLevels;

