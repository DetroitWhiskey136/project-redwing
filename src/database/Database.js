'use strict';
const Enmap = require('enmap');
const classes = require('@classes');
const path = require('path');
const dataDir = `${process.cwd()}${path.sep}${path.join('data', 'enmap_data')}`;

/**
 * The Database used by the client
 */
class Database {
  /**
   * This creates the database functions
   * @param {*} client
   * @property fn
   */
  constructor(client) {
    this.client = client;
    this.fn = {};

    // get the files from classes and assign them.
    for (const i in classes) {
      this[i.toLowerCase()] = new Enmap(i, { dataDir });
      Object.assign(this.fn, { [i.toLowerCase()]: new classes[i](this.client, this) });
    }
  }
}

module.exports = Database;
