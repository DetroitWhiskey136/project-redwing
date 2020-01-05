/* eslint-disable no-unused-vars */
'use strict';
const Doc = require('discord.js-docs');
const Command = require('@command/Command');

class DocumentationCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'docs',
      description: 'Gets documentation about discord.js, commando, rpc and akairo',
      category: 'General',
      usage: '<stable, master, commando, rpc, akairo or akairo-master> <...query>',
      aliases: ['doc'],
      enabled: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args: [source, ...q], discord, messageEmbed, sendMessage }) {
    if (!source) return;

    if (!['stable', 'master', 'commando', 'rpc', 'akairo', 'akairo-master'].includes(source)) {
      const array = [source];
      for (const i in q) {
        array.push(q[i]);
      }
      q = array;
      source = 'master';
    }

    if (!q) return;
    const image = 'https://discord.js.org/static/logo-square.png';
    const doc = await Doc.fetch(source, { force: true });
    const content = await doc.resolveEmbed(q.join('#'));
    if (content !== null) {
      author.icon_url = image;
      channel.send({ embed: content });
    } else {
      channel.send({
        embed: {
          color: member.displayColor,
          description: 'Clearly thats not valid. Try again or don\'t, I couldn\'t care less',
        },
      });
    }
  }
}

module.exports = DocumentationCommand;
