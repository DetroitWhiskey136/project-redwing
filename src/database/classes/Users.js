'use strict';

class Cooldowns {
  constructor(client, database) {
    this.client = client;
    this.database = database;
  }

  /**
   * Gets the stored data of a user.
   * @param {string} id The users id.
   * @returns {Enmap} The database.
   */
  get(id) {
    return this.database.cooldowns.get(id);
  }
  
  /**
   * Sets the stored data of a user.
   * @param {*} id The users id.
   * @param {*} data The data.
   * @returns {Enmap} The database.
   */
  set(bid, data) {
    const { muted, votecool } = data
    return this.database.cooldowns.set(bid, data);
  }

  /**
   * Updates the stored data of a user.
   * @param {*} id The users id.
   * @param {string} key The data property name.
   * @param {string|Number|boolean} value The value.
   * @returns {Enmap} The database.
   */
  update(id, {key, value}) {
    let oldData = this.database.cooldowns.get(id);
    oldData[key] = value;
  }


  /**
   * Deletes a stored users data from the database.
   * @param {*} id The users id.
   * @returns {Enmap} the database.
   */
  delete(id) {
    return this.database.cooldowns.delete(id);
  }

  /**
   * Make sures the users data exists.
   * @param {*} id The users id.
   * @returns {Boolean} True or false.
   */
  ensure(id, data) {
    //const { alltime_votes, certified, description, embedobj, id, monthly_votes, name, owner, prefix, status } = data
    if(!this.database.cooldowns.get(id)){
      this.database.cooldowns.set(id, data);
      return true;
    }
    return false;
  }



}

module.exports = Cooldowns;