/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      description: 'Suggest something.',
      category: 'General',
      usage: 'suggest <text>',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const blacklist = database.fn.blacklist;
    const suggestchan = guild.channels.find((c) => c.name === 'suggestions');
    const e = new messageEmbed();

    if (suggestchan) {
      e.setDescription(`<:denied:482509383893516288> Something went wrong... \nThe channel \`suggestions\` does not exist.`).setColor('RED').setTimestamp();
      return message.channel.send(e);
    }
    blacklist.ensure(member.id, { bot: false, suggest: false });
    if (blacklist.get(member.id, 'suggest') === true) {
      e.setDescription(`<:denied:482509383893516288> You are blacklisted from sending suggestions.`).setColor('RED').setTimestamp();
      return message.channel.send(e);
    }
    if (args.length < 1) {
      e.setDescription(`<:denied:482509383893516288> Usage: \`${prefix}suggest <suggestion>\``).setColor('RED').setTimestamp();
      return message.channel.send(e);
    }
    const suggestmsg = args.join(' ').replace(args[0], '').trim();
    e.setAuthor(`${member.user.username}'s Suggestion`, member.user.avatarURL).setDescription(suggestmsg).setColor('BLUE')
      .setTimestamp();
    suggestchan.send(e).then((m) => m.react(`482509383918551040`).then(m.react('482509383893516288'))).catch((error) => client.logger.error(error));
    e.setDescription(`<:approved:482509383918551040> Your suggestion has been sent.`).setColor('GREEN');
    message.channel.send(e);
    if (guild.members.get(client.user.id).permissions.has('MANAGE_MESSAGES')) message.delete();
  }
}

module.exports = SuggestCommand;
