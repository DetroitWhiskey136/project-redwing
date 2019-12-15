'use strict';

const { Collection } = require('discord.js');
const { REGEX: { REGEX } } = require('@utils/Constants');

class Utils {
  static code(str, lang, minLength = 0, maxLength = 1024) {
    str = String(str);
    return `\`\`\`${lang}\n${str.slice(minLength, maxLength - 3) + (str.length > maxLength - 3 ? '...' : '')}\n\`\`\``;
  }

  static escapeRegExp(str) {
    return str.replace(REGEX, '\\$&');
  }

  static isEmpty(i) {
    if (!i) return true;
    else if (i.constructor === Object) return Object.keys(i).length === 0;
    else if (i.constructor === Collection) return i.size === 0;
    else if (i.constructor === Map) return i.size === 0;
    else if (Array.isArray(i)) return i.length === 0;
    else return false;
  }
}

module.exports = Utils;
