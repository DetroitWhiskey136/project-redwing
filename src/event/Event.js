'use strict';
/**
 * This class creates the command properties to be used
 */
class Event {
  /**
   * Available properties for the command
   * @param {Object} client - Bots client object
   * @param {String} name - Name of the command
   * @param {String} description - Description of the command
   * @param {Boolean} enabled - Is command enabled
   */
  constructor(client, {
    name = null,
    description = 'No description provided.',
    enabled = true,
  }) {
    this.client = client;
    this.conf = { enabled };
    this.help = { name, description };
  }
}
module.exports = Event;
