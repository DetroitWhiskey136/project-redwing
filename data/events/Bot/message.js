/* eslint-disable max-len, no-useless-escape, no-unused-vars */
'use strict';
require('dotenv').config();

const Event = require('@event/Event');
const { escapeRegExp } = require('@utils/Utils');
const CommandContext = require('@command/CommandContext');

class MessageEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'message',
      description: 'Fires when a message is recieved',
      enabled: true,
    });
  }

  run(client, message) {
    // Get useful poperties from the message object
    const { author, channel, content, guild, member } = message;
    const database = client.database;

    // Check if author is a bot and if the client has permisson to speak in the channel
    if (author.bot || (guild && !channel.permissionsFor(client.user).has('SEND_MESSAGES'))) return;

    const settings = client.database.fn.settings.get(guild.id);
    message.settings = settings;

    // Prefix related tasks
    const prefix = settings.general.prefix;
    const fixedPrefix = escapeRegExp(prefix);
    const fixedUsername = escapeRegExp(client.user.username);

    const PrefixRegex = new RegExp(`^(<@!?${client.user.id}>|${fixedPrefix}|${fixedUsername})`, 'i', '(\s+)?');

    let usedPrefix = content.match(PrefixRegex);
    usedPrefix = usedPrefix && usedPrefix.length && usedPrefix[0];

    // Mention related tasks
    const MentionRegex = new RegExp(`^(<@!?${client.user.id}>)`);
    const mentioned = MentionRegex.test(content);
    const helpPrefix = `My prefix in this guild is: ${prefix}`;

    if (usedPrefix) {
      // split the message content into seperate arguments
      const args = content.slice(usedPrefix.length).trim().split(/ +/g);
      // get the commandName from the first argumnet
      const commandName = args.shift().toLowerCase();
      // get the command from the client based on commandName
      const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

      // check if mentioned and invalid command provided
      if (mentioned && !command) return message.reply(helpPrefix);

      const level = client.permLevel(message);

      if (command) {
        if (!guild && command.conf.guildOnly) {
          channel.send(`This command ${command.help.name} is unavailable in DMs. Please run this command in a guild.`);
          client.logger.warn(`${client.config.permLevels.find((l) => l.level === level).name} ${author.username} (${author.id}) ran unauthorized command ${command.help.name} in DMs`);
          return;
        }

        if (level < client.levelCache[command.conf.permLevel]) {
          if (settings.general.sysnotice) {
            channel.send(`You do not have permission to use this command. Your permission level is ${level} (${client.perms.find((l) => l.level === level).name}) this command requires level ${client.levelCache[command.conf.permLevel]} (${command.conf.permLevel})`);
          }
          client.logger.unauthorized(`${client.perms.find((l) => l.level === level).name} ${author.username} (${author.id}) ran unauthorized command: ${command.help.name} Content: ${content}`);
          return;
        }

        author.permLevel = level;

        const params = { args, message, prefix, level, query: args.join(' ') };
        return command.run(new CommandContext(params));
      }
    }
  }
}

module.exports = MessageEvent;
