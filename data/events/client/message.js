'use strict';

const { CommandContext, BotEvent } = require('@structures');
const { escapeRegExp } = require('@utils/Utils');

class MessageEvent extends BotEvent {
  constructor(client) {
    super(client);
  }

  async on(client, message) {
    // message data
    const { author, channel, content, guild } = message;

    // check perms
    if (author.bot || (guild && !channel.permissionsFor(client.user).has('SEND_MESSAGES'))) return;

    // get GuildData from db
    const guildData = client.database && await client.database.fn.guildsettings.getGuild(guild.id);

    // start defining the prefix stuff
    const prefix = guildData.general.prefix;
    const fixedPrefix = escapeRegExp(prefix);

    const usernameFixed = escapeRegExp(client.user.username);

    const PrefixRegex = new RegExp(`^(<@!?${client.user.id}>|${fixedPrefix}|${usernameFixed})(\\s+)?`, 'i');
    let usedPrefix = content.match(PrefixRegex);
    usedPrefix = usedPrefix && usedPrefix.length && usedPrefix[0];
    const MentionRegex = new RegExp(`^(<@!?${client.user.id}>)`);
    const mentioned = MentionRegex.test(content);

    const commandsDisabled = guildData && guildData.disableChannels && guildData.disableChannels.includes(channel.id);

    if (mentioned && !usedPrefix) {
      return channel.send(`My prefix is ${prefix}`);
    }

    if (usedPrefix) {
      const args = content.slice(usedPrefix.length).trim().split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.fetch(commandName);

      if (command && command.name !== 'disable' && commandsDisabled) return;

      if (command) {
        const params = { args, guildData, command, message, prefix, query: args.join(' ') };
        command._run(new CommandContext(params), args).catch(console.error);
      }
    }
  }
}

module.exports = MessageEvent;
