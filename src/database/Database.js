'use strict';
const Enmap = require('enmap');
const functions = require('./functions');

class Database {
  constructor(client, localPath) {
    this.client = client;
    this.fn = {};

    for (const i in functions) {
      this[i.toLowerCase()] = new Enmap(i, { dataDir: localPath });
      Object.assign(this.fn, { [i.toLowerCase()]: new functions[i](this.client, this) });
    }
  }
}

module.exports = Database;
