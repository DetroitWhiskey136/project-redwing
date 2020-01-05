/* eslint-disable no-unused-expressions */
'use strict';
require('module-alias/register');
require('dotenv').config();

const BotClient = require('@root/structures/discord/BotClient');
const { CLIENT_OPTIONS } = require('@utils/Constants');
const permLevels = require('@permissions/Levels');
const path = require('path');
const klaw = require('klaw');

const client = new BotClient(CLIENT_OPTIONS);

const init = () => {
  klaw('data/commands').on('data', (item) => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== '.js') return;
    const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response) client.logger.error(response);
  });

  klaw('data/events').on('data', (item) => {
    const evtFile = path.parse(item.path);
    if (!evtFile.ext || evtFile.ext !== '.js') return;
    const response = client.loadEvent(evtFile.dir, `${evtFile.name}${evtFile.ext}`);
    if (response) client.logger.error(response);
  });

  client.login(process.env.TOKEN);
};

client.levelCache = {};

for (let i = 0; i < permLevels.length; i++) {
  const thisLevel = permLevels[i];
  client.levelCache[thisLevel.name] = thisLevel.level;
}


init();

client
  .on('shardDisconnected', () => client.logger.debug('Shard Disconnected...') && process.exit(1))
  .on('shardReconnecting', () => client.logger.debug('Shard Reconnecting...'))
  .on('error', (error) => client.logger.error(error))
  .on('warn', (info) => client.logger.warn(info))
  .on('debug', (debug) => {
    if (process.env.DEBUG === 'true') client.logger.debug(debug);
  });

process
  .on('uncaughtException', (error) => {
    const msg = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    client.logger.error(`Uncaught Exception: ${msg}`);
    process.exit(1);
  })
  .on('unhandledRejection', (error) => client.logger.error(`Uncaught Prommise Error: ${error.stack}`));
