'use strict';

module.exports = {
  // command
  Command: require('./command/Command'),
  CommandError: require('./command/CommandError'),
  // discord
  BotClient: require('./discord/BotClient'),
  BotEvent: require('./discord/BotEvent'),
  // root
  Loader: require('./Loader'),
};
