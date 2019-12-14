'use strict';

module.exports = {
  // command
  Command: require('./command/Command'),
  CommandContext: require('./command/CommandContext'),
  CommandError: require('./command/CommandError'),
  // discord
  BotClient: require('./discord/BotClient'),
  BotEvent: require('./discord/BotEvent'),
  // root
  Loader: require('./Loader'),
};
