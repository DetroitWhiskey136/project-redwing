'use strict';

const { CommandError } = require('@command');

class Requirements {
  constructor(requirements = {}, responses = {}) {
    requirements = Object.assign({
      argsRequired: false,
      guildOnly: false,
      permissions: [],
      clientPermissions: [],
    }, requirements);
    this.argsRequired = requirements.argsRequired;
    this.ownerOnly = requirements.ownerOnly;
    this.clientPermissions = requirements.clientPermissions;
    this.permissions = requirements.permissions;
    this.guildOnly = requirements.guildOnly;

    this.responses = Object.assign({
      guildOnly: 'This command can only be used inside guilds!',
      argsRequired: 'You need to input some arguments into the command',
    }, responses);
  }

  // eslint-disable-next-line no-unused-vars
  handle({ args, author, channel, client, member, guild }) {
    if (this.guildOnly && !guild) throw new CommandError(this.responses.guildOnly);

    const clientPerms = [];
    this.clientPermissions.filter((p) => !channel.permissionsFor(guild.me).has(p)).forEach((p) => {
      clientPerms.push(p.split('_').map((b) => b[0].toUpperCase() + b.slice(1).toLowerCase()).join(' '));
    });
    if (clientPerms.length !== 0) {
      throw new CommandError(`I am missing the following permission(s): ${clientPerms.join(', ')}`, {
        onUsage: true,
      });
    }

    if (this.argsRequired && args.length === 0) {
      throw new CommandError(this.responses.argsRequired, {
        onUsage: true,
      });
    }
  }
}

module.exports = Requirements;
