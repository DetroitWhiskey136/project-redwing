/* eslint-disable no-unused-vars */
'use strict';
const Command = require('@command/Command');

class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Latency and API response times.',
      category: 'General',
      usage: 'ping',
      aliases: ['pong'],
      enabled: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    try {
      const embed = new messageEmbed()
        .setColor(member.displayColor)
        .setDescription('🏓 Ping!');
      const msg = await channel.send(embed);
      const timeStamp = msg.createdTimestamp - message.createdTimestamp;
      embed.setDescription(`🏓 Pong! (Roundtrip took: ${timeStamp}ms. 💙: ${Math.round(client.ws.ping)}ms.)`);
      msg.edit(embed);
    } catch (e) {
      client.logger.error(e);
    }
  }
}

module.exports = PingCommand;
