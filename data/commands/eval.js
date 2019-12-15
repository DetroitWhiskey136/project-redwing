'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@structures');
const { code } = require('@utils/Utils');
const { inspect } = require('util');
const token = process.env.DISCORD_TOKEN;
const value = (s) => code(s, 'js').replace(new RegExp(token, 'g'), () => '*'.repeat(token.length));

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      category: 'dev',
      requirements: {
        ownerOnly: true,
      },
    });
  }

  async run(ctx) {
    // eslint-disable-next-line no-unused-vars, max-len
    const { args, author, channel, client, command, database, emoji, guild, member, message, prefix, query, guildData } = ctx;
    const embed = new MessageEmbed();
    const text = query.replace(/^```(js|javascript ?\n)?|```$/gi, '');

    try {
      const evald = await Promise.resolve(eval(text));
      const fixed = inspect(evald, { depth: 0, showHidden: true });

      embed
        .setDescription(value(fixed))
        .setColor('GREEN');

      if (!fixed || !evald) embed.setColor('RED');
    } catch (error) {
      embed
        .setDescription(value(error))
        .setColor('RED');
      console.error(['COMMAND', 'EVAL-RESULT'], error);
    } finally {
      const msg = await channel.send(embed);
      const permissions = channel.permissionsFor(guild.me);

      if (permissions.has('ADD_REACTIONS') && permissions.has('MANAGE_MESSAGES')) {
        await msg.react(emoji('CANCEL', { id: true }));

        const filter = (r, u) => r.me && message.author.id === u.id;
        const collector = await msg.createReactionCollector(filter, { max: 1, errors: ['time'], time: 30000 });

        collector.on('collect', async () => {
          if (msg) await msg.delete().catch(() => null);
          if (message) await message.delete().catch(() => null);
        });
        collector.on('end', async () => {
          if (msg) await msg.reactions.removeAll().catch(() => null);
        });
      }
    }
  }
}

module.exports = Eval;
