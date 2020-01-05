/* eslint-disable max-len, require-atomic-updates */
'use strict';

const Event = require('@event/Event');
const { guildAvailable, existsName, writeDefaults } = require('@utils/GuildUtils');

class GuildCreateEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'guildCreate',
      description: 'Fires when the bot joins a guild',
      enabled: true,
    });
  }

  run(client, guild) {
    if (!guildAvailable(guild)) return new Error(`Guild Unavailable: ${guild.id}`);

    // eslint-disable-next-line no-unused-vars
    const { id, name, channels, roles, owner, ownerID } = guild;

    const data = {
      adminrole: existsName(roles, 'admin'),
      adminlog: existsName(channels, 'admin-logs'),
      modrole: existsName(roles, 'moderator'),
      modlog: existsName(channels, 'mod-logs'),
      welcomelog: existsName(channels, 'welcome'),
      leavelog: existsName(channels, 'leave'),
    };

    return writeDefaults(client, id, data);
  }
}

module.exports = GuildCreateEvent;
