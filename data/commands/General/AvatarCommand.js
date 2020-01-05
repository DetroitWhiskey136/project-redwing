/* eslint-disable no-unused-vars */
'use strict';
const Command = require('@command/Command');

class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: 'Displays the command authors avatar.',
      category: 'General',
      usage: 'avatar',
      aliases: ['av'],
      enabled: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    if (channel.permissionsFor(client.user).has('MANAGE_MESSAGES')) message.delete();
    const msg = await channel.send('``Generating Avatar``');

    const format = member.user.displayAvatarURL({ size: 2048 }).includes('gif') ? 'gif' : 'png';

    const embed = new messageEmbed()
      .setImage(member.user.displayAvatarURL({ size: 2048, format: format }))
      .setTitle(`${member.displayName}'s Profile Picture`)
      .setColor(member.displayColor);

    channel.send(embed);
    msg.delete();
  }
}

module.exports = AvatarCommand;
