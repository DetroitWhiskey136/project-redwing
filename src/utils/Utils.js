/* eslint-disable no-unused-expressions */
'use strict';

const { REGEX: { REGEX, USER_ID } } = require('@utils/Constants');
const manager = require('@discord/Manager');

class Utils {
  /**
   * If string is longer than maxlength will cut string down
   * @param {String} str
   * @param {String} lang
   * @param {Number} minLength
   * @param {Number} maxLength
   */
  static code(str, lang, minLength = 0, maxLength = 1024) {
    str = String(str);
    return `\`\`\`${lang}\n${str.slice(minLength, maxLength - 3) + (str.length > maxLength - 3 ? '...' : '')}\n\`\`\``;
  }

  /**
   * Escapes Regular Expression
   * @param {String} str
   */
  static escapeRegExp(str) {
    return str.replace(REGEX, '\\$&');
  }

  /**
   * This is good for Titles, thats about it.
   * @param {String} str - String you want to make proper case
   */
  static toProperCase(str) {
    if (typeof str !== 'string') throw new TypeError('text must be type string');
    return (str ? str.toLowerCase() : this)
      .replace(/(^|[\s\xA0])[^\s\xA0]/g, (s) => s.toUpperCase());
  }

  /**
   * MESSAGE CLEAN FUNCTION
   *
   * Mostly used for the __*Compile*__ and __*Exec*__ commands
   *
   ** removes @everyone pings
   ** removes tokens
   ** makes code blocks escaped so they're shown more easily
   ** also resolves promises and stringifies objects
   * @param {String} str
   */
  static async clean(str) {
    if (str && str.constructor.name === 'Promise') str = await str;
    if (typeof evaled !== 'string') str = require('util').inspect(str, { depth: 0 });

    str = str
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(this.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');

    return str;
  }

  /**
   * SINGLE LINE AWAITMESSAGE
   *
   * A simple way to grab a single reply, from the user that initiated the command.
   ** Useful to get __*precisions*__ on certain things.
   * @example const response = await client.awaitReply(msg, "Am i cool?"); msg.reply(response)
   * @param {*} msg
   * @param {String} question
   * @param {Number} limit
   */
  static async awaitReply(msg, question, limit = 60000) {
    // eslint-disable-next-line no-return-assign
    const filter = (m) => m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
      return collected.first().content;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the state of a setting
   * @param {Boolean} state
   * @returns `ON/OFF`
   */
  static getState(state) {
    let res = 'OFF';
    if (state === 'true') {
      res = 'ON';
    }
    return res;
  }

  /**
   * Checks is id is a UserID
   * @param {String} id
   * @todo Move to UserUtils
   */
  static isUserID(id) {
    return id && !USER_ID.test(id);
  }

  static hasPlaceholder(message, placeholder, value) {
    let result;
    message.includes(placeholder) ? result = message.replace(placeholder, value) : result = message;
    return result;
  }

  static isBoolean(str) {
    let result;
    str === 'true' ? result = true : str === 'false' ? result = false : result = str;
    return result;
  }

  /**
   * Tries to get a guild member based on the parmas provided
   * @param {*} query fuzzy search params
   * @param {*} message the message used
   * @returns {GuildMember|null} The GuildMember or null
   * @memberof Utils
   */
  static getMember(query, message) {
    const { member, guild, mentions } = message;
    let guildMember;
    if (query.length <= 0) {
      guildMember = member;
    } else if (mentions.members.size >= 1) {
      guildMember = mentions.members.first();
    } else {
      guildMember = manager.get(guild.members, query) ||
        manager.find(guild.members, (m) => m.displayName.toUpperCase() === query.toUpperCase()) ||
        manager.find(guild.members, (m) => m.user.username.toUpperCase() === query.toUpperCase()) ||
        manager.find(guild.members, (m) => m.user.tag.toUpperCase() === query.toUpperCase()) ||
        manager.find(guild.members, (m) => m.user.id.toUpperCase() === query.toUpperCase()) ||
        manager.find(guild.members, (m) => m.user.username.toUpperCase().startsWith(query.toUpperCase())) ||
        manager.find(guild.members, (m) => m.user.username.toUpperCase().endsWith(query.toUpperCase())) ||
        manager.find(guild.members, (m) => m.displayName.toUpperCase().startsWith(query.toUpperCase())) ||
        manager.find(guild.members, (m) => m.displayName.toUpperCase().endsWith(query.toUpperCase())) ||
        null;
    }

    if (!guildMember) {
      return null;
    } else {
      return guildMember;
    }
  }
}

module.exports = Utils;
