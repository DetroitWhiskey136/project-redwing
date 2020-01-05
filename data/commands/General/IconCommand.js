/* eslint-disable no-unused-vars */
'use strict';
const Command = require('@command/Command');

class ServerIconCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'icon',
      description: 'Displays the servers icon',
      category: 'General',
      usage: 'icon',
      aliases: ['guildicon', 'servericon'],
      enabled: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    if (message.channel.permissionsFor(client.user).has('MANAGE_MESSAGES')) message.delete();
    const msg = await channel.send('``Generating Guild Icon``');

    if (!guild.iconURL) return msg.edit(`No icon found for ${guild.name}`);

    const format = guild.iconURL({ size: 2048 }).includes('gif') ? 'gif' : 'png';

    const embed = new messageEmbed()
      .setImage(guild.iconURL({ format: format, size: 2048 }))
      .setTitle(`${guild.name}'s Icon`)
      .setColor(member.displayColor);
    channel.send(embed);
    msg.delete();
  }
}

module.exports = ServerIconCommand;
