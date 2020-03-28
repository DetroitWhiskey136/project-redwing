'use strict';

class Manager {
  static size(query) {
    return query.cache.size;
  }

  static get(query, id) {
    return query.cache.get(id);
  }

  static fetch(query, id) {
    return query.fetch(id);
  }

  static find(query, fn) {
    return query.cache.find(fn);
  }
}
module.exports = Manager;
