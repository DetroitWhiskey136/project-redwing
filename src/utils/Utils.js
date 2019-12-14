'use strict';

const { REGEX: { REGEX } } = require('@utils/Constants');

class Utils {
  static code(str, lang, minLength = 0, maxLength = 1024) {
    str = String(str);
    return `\`\`\`${lang}\n${str.slice(minLength, maxLength - 3) + (str.length > maxLength - 3 ? '...' : '')}\n\`\`\``;
  }

  static escapeRegExp(str) {
    return str.replace(REGEX, '\\$&');
  }
}

module.exports = Utils;
