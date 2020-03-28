'use strict';

class Bots {
  constructor(client, database) {
    this.client = client;
    this.database = database;
  }

  /**
   * Gets the stored data of a bot.
   * @param {string} id The bots id.
   * @returns {Enmap} The database.
   */
  get(id) {
    return this.database.bots.get(id);
  }

  /**
   * Sets the stored data of a bot.
   * @param {*} id The bots id.
   * @param {*} data The data.
   * @returns {Enmap} The database.
   */
  set(id, data) {
    // eslint-disable-next-line no-unused-vars
    const { alltime_votes, certified, description, embedobj, monthly_votes, name, owner, prefix, status } = data;
    return this.database.bots.set(id, data);
  }

  /**
   * Updates the stored data of a bot.
   * @param {*} id The bots id.
   * @param {string} key The data property name.
   * @param {string|Number|boolean} value The value.
   * @returns {Enmap} The database.
   */
  update(id, { key, value }) {
    let oldData = this.database.bots.get(id);
    oldData[key] = value;
  }


  /**
   * Deletes a stored bots data from the database.
   * @param {*} id The bots id.
   * @returns {Enmap} the database.
   */
  delete(id) {
    return this.database.bots.delete(id);
  }
}
module.exports = Bots;
