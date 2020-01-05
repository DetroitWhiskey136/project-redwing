'use strict';

class GuildUtils {
  /**
   * Checks if a guild is available.
   * @param {object} guild
   * @returns {boolean}
   */
  static guildAvailable(guild) {
    return guild.available;
  }

  /**
   * Checks if a data exists in an object based on the supplied name.
   * @param {*} obj
   * @param {string} data
   * @returns {object} result[0]
   */
  static existsName(obj, data) {
    let result = [];
    obj.some((o) => [data.toLowerCase()].includes(o.name.toLowerCase()) && result.push(o));
    if (result.length <= 0) {
      return null;
    }
    return result[0].id;
  }

  static writeDefaults(client, guildID, data = {}) {
    client.database.fn.settings.set(guildID, data);
  }
}

module.exports = GuildUtils;
