'use strict';

const { DEFAULTS } = require('@utils/Constants');
// const { awaitReply } = require('../../utils/Utils');

class Settings {
  constructor(client, database) {
    this.client = client;
    this.database = database;
  }

  /**
   * Gets the stored data of a guild
   * @param {String} guildID
   */
  get(guildID) {
    return this.database.settings.get(guildID);
  }

  /**
   * Sets the stored data of a guild
   * @param {String} guildID
   * @param {*} data
   */
  set(guildID, data) {
    // eslint-disable-next-line max-len, no-unused-vars
    const { prefix, sysnotice, modlog, modrole, adminlog, adminrole, welcomelog, welcomemsg, welcomeen, leavelog, leavemsg, leaveen, verifyguild, verifychannel } = data;

    const result = {
      general: {
        prefix: prefix || '!',
        sysnotice: sysnotice || false,
      },
      moderator: {
        modlog: modlog || null,
        modrole: modrole || null,
      },
      admin: {
        adminlog: adminlog || null,
        adminrole: adminrole || null,
      },
      welcome: {
        welcomelog: welcomelog || null,
        welcomemsg: welcomemsg || `Welcome {{user}} to {{guild}}, please read over the rules and have fun.`,
        welcomeen: welcomeen || false,
      },
      leave: {
        leavelog: leavelog || null,
        leavemsg: leavemsg || `All good things come to an end`,
        leaveen: leaveen || false,
      },
      bots: {
        verifyguild: verifyguild || null,
        verifychannel: verifychannel || null,
      },
    };
    return this.database.settings.set(guildID, result);
  }

  /**
   * Deletes the data of a guild
   * @param {String} guildID
   */
  delete(guildID) {
    return this.database.settings.delete(guildID);
  }

  update(guildID, { key, value }) {
    let oldData = this.database.settings.get(guildID);
    for (const i in oldData) {
      if (key in oldData[i]) {
        oldData[i][key] = value;
        return this.database.settings.set(guildID, oldData);
      }
    }
    return new Error('Key not found');
  }


  /* Everything that follows will be removed */

  /* DEFAULT METHODS */
  getSettings(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    return db;
  }

  /* PREFIX RELATED METHODS */
  getPrefix(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.prefix || DEFAULTS.prefix;
    return result;
  }

  setPrefix(guildID, prefix) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.prefix = prefix;
    return this.database.settings.set(guildID, db);
  }

  /* SYSTEM RELATED METHODS */
  getSystemNotice(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.systemNotice || DEFAULTS.systemNotice;
    return result;
  }

  setSystemNotice(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.systemNotice = value;
    return this.database.settings.set(guildID, db);
  }

  /* WELCOME RELATED METHODS */
  getWelcome(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.welcomeMessage || DEFAULTS.welcomeMessage;
    return result;
  }

  setWelcome(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.welcomeMessage = value;
    return this.database.settings.set(guildID, db);
  }

  getWelcomeEn(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.welcomeEnabled || DEFAULTS.welcomeEnabled;
    return result;
  }

  setWelcomeEn(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.welcomeEnabled = value;
    return this.database.settings.set(guildID, db);
  }

  getWelcomeLog(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.welcomeChannel || DEFAULTS.welcomeChannel;
    return result;
  }

  setWelcomeLog(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.welcomeChannel = value;
    return this.database.settings.set(guildID, db);
  }

  /* ADMIN RELATED METHODS */
  getAdmin(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.adminRole || DEFAULTS.adminRole;
    return result;
  }

  setAdmin(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.adminRole = value;
    return this.database.settings.set(guildID, db);
  }

  /* MOD RELATED METHODS */
  getMod(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.modRole || DEFAULTS.modRole;
    return result;
  }

  setMod(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.modRole = value;
    return this.database.settings.set(guildID, db);
  }

  getModLog(guildID) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    const result = db.modLogChannel || DEFAULTS.modLogChannel;
    return result;
  }

  setModLog(guildID, value) {
    checkDB(this.database.settings, guildID);
    const db = this.database.settings.get(guildID);
    db.modLogChannel = value;
    return this.database.settings.set(guildID, db);
  }
}

async function checkDB(db, guild) {
  if (!db.has(guild)) {
    await db.set(guild, DEFAULTS);
  }
}

module.exports = Settings;
