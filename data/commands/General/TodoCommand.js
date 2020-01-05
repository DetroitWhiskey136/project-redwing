/* eslint-disable no-unused-vars */
'use strict';
const Command = require('@command/Command');

class TodoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'todo',
      description: 'control todos, available options add, edit, delete, (if left blank will display list of your todos)',
      category: 'Developer',
      usage: 'todo <add, edit, delete>',
      aliases: [],
      enabled: true,
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args: [task, ...content], discord, messageEmbed, sendMessage }) {
    if (!task) {
      return sendMessage('List All used');
    } else if (task.toLowerCase() === 'add') {
      return sendMessage('Add used');
    } else if (task.toLowerCase() === 'edit') {
      return sendMessage('Edit used');
    } else if (task.toLowerCase() === 'delete') {
      return sendMessage('Delete used');
    }
  }
}

module.exports = TodoCommand;
