'use strict';

class GuildSettings {
  constructor(client, database) {
    this.client = client;
    this.database = database;
  }

  getGuild(guildID) {
    return this.database.guildsettings.get(guildID);
  }

  setGuild(guildID, data = {}) {
    const { prefix, sysnotice, modlog, modrole,
      adminlog, adminrole, welcomelog, welcomemsg,
      welcomeen, leavelog, leavemsg, leaveen } = data;
    const result = {
      general: {
        prefix: prefix || '!',
        sysnotice: sysnotice || false,
      },
      moderator: {
        modlog: modlog || 'moderator-log',
        modrole: modrole || 'Moderator',
      },
      admin: {
        adminlog: adminlog || 'admin-log',
        adminrole: adminrole || 'Admin',
      },
      welcome: {
        welcomelog: welcomelog || 'welcome',
        welcomemsg: welcomemsg || `Welcome {{user}} to {{x}}, please read over the rules and have fun.`,
        welcomeen: welcomeen || false,
      },
      leave: {
        leavelog: leavelog || 'leave',
        leavemsg: leavemsg || `All good things come to an end`,
        leaveen: leaveen || false,
      },
    };
    return this.database.guildsettings.set(guildID, result);
  }
}

/*
General
  prefix
  systemNotice

Moderator
  modlog
  modrole

Admin
  adminlog
  adminrole

Welcome
  welcomelog
  welcomemsg
  welcomeen

Leave
  leavelog
  leavemsg
  leaveen


*/

module.exports = GuildSettings;
