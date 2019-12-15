'use strict';

const { escapeRegExp, isEmpty } = require('@utils/Utils');

class MessageUtils {
  static getUsedPrefix(prefix, client, content) {
    const fixedPrefix = escapeRegExp(prefix);
    const usernameFixed = escapeRegExp(client.user.username);

    const PrefixRegex = new RegExp(`^(<@!?${client.user.id}>|${fixedPrefix}|${usernameFixed})(\\s+)?`, 'i');
    let usedPrefix = content.match(PrefixRegex);
    return !isEmpty(usedPrefix) && usedPrefix[0];
  }

  static getMentioned(client, content) {
    const MentionRegex = new RegExp(`^(<@!?${client.user.id}>)`);
    const mentioned = MentionRegex.test(content);
    return !isEmpty(mentioned);
  }
}

module.exports = MessageUtils;
