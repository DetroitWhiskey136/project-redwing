/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      description: 'Ban a user',
      category: 'Moderation',
      usage: 'ban <user>',
      guildOnly: true,
      aliases: [],
      permLevel: 'moderator',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    let mem; // The selected user (Defined later)
    const embed = new messageEmbed();

    if (!guild.members.get(client.user.id).permissions.has('BAN_MEMBERS')) {
      embed.setDescription('I need `BAN_MEMBERS` to do this.').setColor('RED');
      return sendMessage(embed);
    }

    if (!query) {
      embed.setDescription('You are missing arguments').setColor('RED');
      return sendMessage(embed);
    }

    if (args.length <= 0 && mentions.length <= 0) {
      embed.setDescription('Please mention a user or specify an id.').setColor('RED');
      return sendMessage(embed);
    }

    mem = guild.members.find((m) => m.id === args[0]) || guild.members.find((m) => m.id === mentions.users.first().id);
    if (!mem) {
      embed.setDescription('That user doesn\'t exist.').setColor('RED');
      return sendMessage(embed);
    }

    let reason = 'Unspecified Reason';
    if (args.length > 2) {
      reason = args.join(' ').replace(args[0], '').trim();
    }

    if (!mem.bannable) {
      embed.setDescription('That user cannot be banned.').setColor('RED');
      return message.channel.send(embed);
    }

    mem.ban(reason);
    embed.setDescription(`Banned ${mem} for \`${reason}\``).setColor('GREEN');
    sendMessage(embed);
  }
}

module.exports = BanCommand;
