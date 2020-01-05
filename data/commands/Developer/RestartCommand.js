/* eslint-disable no-unused-vars */
'use strict';
const Command = require('@command/Command');

class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'restart',
      description: 'If running the bot with pm2 bot will restart, otherwise stops the bot.',
      category: 'Developer',
      usage: 'restart',
      permLevel: 'botowner',
      aliases: ['reboot', 'power'],
      guildOnly: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    try {
      await message.reply('Bot is shutting down.');
      client.commands.forEach(async (cmd) => {
        await client.unloadCommand(cmd);
      });
      process.exit(0);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = RestartCommand;
