/* eslint-disable no-lonely-if */
'use strict';

const { REGEX: { ROLE_ID, ROLE_MENTION } } = require('@utils/Constants');

class RoleUtils {
  /**
   * Checks if the input has a vaild Role Mention syntax
   * @param {String} input string
   * @returns {Boolean} Boolean
   */
  static isRoleMention(input) {
    return input && ROLE_MENTION.test(input);
  }

  /**
   * Checks if the id has a valid Role ID syntax
   * @param {String} id string
   * @returns {Boolean} Boolean
   */
  static isRoleID(id) {
    return id && ROLE_ID.test(id);
  }

  /**
   * Checks if the provided input is a valid role in the specified guild
   * @param {*} guild Guild ID
   * @param {String} input Role <name, ID, mention>
   * @returns {Boolean} Boolean
   */
  static isValidRole(guild, input) {
    if (ROLE_ID.test(input)) {
      if (guild.roles.find((r) => r.id === input)) return true;
    } else {
      if (guild.roles.find((r) => r.name === input)) return true;
    }
    return false;
  }

  /**
   * Gets the role based on input
   * @param {*} guild
   * @param {*} input
   */
  static getRole(guild, input) {
    let role;
    if (guild.roles.find((r) => r.id === input)) {
      role = guild.roles.find((r) => r.id === input);
    }
    if (guild.roles.find((r) => r.name === input)) {
      role = guild.roles.find((r) => r.name === input);
    }

    return role;
  }
}

module.exports = RoleUtils;
