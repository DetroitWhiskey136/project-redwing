/* eslint-disable max-len, require-atomic-updates */
'use strict';

const Event = require('@event/Event');

class ReadyEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'ready',
      description: 'Fires when the bot is ready',
      enabled: true,
    });
  }

  async run(client) {
    await client.wait(1000);

    client.appInfo = await client.fetchApplication();
    setInterval(async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);

    require('@utils/dashboard')(client);

    client.user.setActivity(`mentions | ${client.guilds.cache.size} Guilds`, { type: 3 });

    client.logger.ready(`${client.user.username}, Ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} guilds.`);
  }
}

module.exports = ReadyEvent;
