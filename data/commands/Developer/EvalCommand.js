/* eslint-disable max-len, max-depth, no-unused-vars */
'use strict';
const token = process.env.TOKEN;
const { code } = require('@utils/Utils');
const Command = require('@command/Command');
const { inspect } = require('util');
const value = (str) => code(str, 'js').replace(token, () => '*'.repeat(token.length));

class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Evaluates arbituabry JavaScript',
      category: 'Developer',
      usage: 'eval <code>',
      aliases: ['compile', 'ev', 'js'],
      permLevel: 'botadmin',
      guildOnly: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    const embed = new messageEmbed();
    const text = query.replace(/^```(js|javascript ?\n)?|```$/gi, '');

    try {
      let tt = text.split('\n');
      tt[tt.length - 1] = `return ${tt[tt.length - 1]}`;
      const fixedText = tt.join('\n');
      const evaluated = await Promise.resolve(eval(text));
      const inspected = inspect(evaluated, { depth: 0, showHidden: true });
      embed
        .setDescription(value(inspected))
        .setColor('GREEN');

      if (!inspected || !evaluated) embed.setColor('RED');
    } catch (error) {
      embed
        .setDescription(value(error));
    } finally {
      channel.send(embed);
    }
  }
}

module.exports = EvalCommand;
