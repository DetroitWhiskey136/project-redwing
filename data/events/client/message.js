'use strict';

const { CommandContext, BotEvent } = require('@structures');
const { getUsedPrefix, getMentioned } = require('@utils/MessageUtils');

class MessageEvent extends BotEvent {
  constructor(client) {
    super(client);
  }

  async on(client, message) {
    const { author, channel, content, guild } = message;

    if (author.bot || (guild && !channel.permissionsFor(client.user).has('SEND_MESSAGES'))) return;

    const guildData = client.database.fn.guildsettings.getGuild(guild.id);

    const prefix = guildData.general.prefix || process.env.PREFIX;
    const usedPrefix = await getUsedPrefix(prefix, client, content);

    if (usedPrefix) {
      const args = content.slice(usedPrefix.length).trim().split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.fetch(commandName);

      if (getMentioned(client, content) && !command) return channel.send(`My prefix is \`${prefix}\``);

      if (command) {
        const params = { args, guildData, command, message, prefix, query: args.join(' ') };
        command._run(new CommandContext(params), args).catch(console.error);
      }
    }
  }
}

module.exports = MessageEvent;
