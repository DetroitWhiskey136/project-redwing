/* eslint-disable no-array-constructor */
'use strict';
/**
 * This class creates the command properties to be used in the constructor
 */
class Command {
  /**
   * Available properties for the command
   * @param {Object} client - Bots client object
   * @param {String} name - Name of the command
   * @param {String} description - Description of the command
   * @param {String} usage - Usage of the command
   * @param {Boolean} enabled - Is command enabled
   * @param {Boolean} guildOnly - Is Command allowed in dms
   * @param {Array} aliases - Other calls for the command (less is more)
   * @param {String} permLevel - Required permission level to use the command
   */
  constructor(client, {
    name = null,
    description = 'No description provided.',
    category = 'Miscellaneous',
    usage = 'No usage provided.',
    enabled = true,
    guildOnly = false,
    aliases = new Array,
    permLevel = 'User',
  }) {
    /**
     * The Client
     ** `client`
     */
    this.client = client;
    /**
     * The Conf
     ** `enabled`, `guildOnly`, `aliases`, `permLevel`
     */
    this.conf = { enabled, guildOnly, aliases, permLevel };
    /**
     * The Help
     ** `name`, `description`, `category`, `usage`
     */
    this.help = { name, description, category, usage };
  }
}
module.exports = Command;
