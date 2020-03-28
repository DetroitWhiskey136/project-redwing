/* eslint-disable no-unused-vars */
'use strict';
const Command = require('@command/Command');

class ReloadCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reload',
      description: 'Reloads a command that has been modified.',
      category: 'Developer',
      usage: 'reload <commnad>',
      permLevel: 'botadmin',
      guildOnly: true,
      enabled: true,
      aliases: ['rl', 'load'],
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    if (!query) return channel.reply('Must provide a command to reload.');

    // eslint-disable-next-line max-len
    const commands = client.commands.get(query) || client.commands.get(client.aliases.get(query));
    if (!commands) return message.reply(`The Command \`${query}\` doesn't exist, nor was it an alias.`);

    let response = await client.unloadCommand(commands.conf.location, commands.help.name);
    if (response) return message.reply(`Error Unloading: ${response}`);

    response = client.loadCommand(commands.conf.location, commands.conf.fileName);
    if (response) return message.reply(`Error Loading: ${response}`);

    client.logger.log(`Reloaded ${commands.help.name}`); // Delete later
    channel.send(`The Command \`${commands.help.name}\` has been reloaded.`);
  }
}

module.exports = ReloadCommand;
