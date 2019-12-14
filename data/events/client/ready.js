'use strict';

const { MessageEmbed } = require('discord.js');
const { BotEvent } = require('@structures');
const { Constants: { CHANNELS, COLORS } } = require('@utils');

class ReadyEvent extends BotEvent {
  constructor(client) {
    super(client);
  }

  // eslint-disable-next-line no-unused-vars
  on(client) {
    console.log(`Bot Ready!`);
    const embed = new MessageEmbed()
      .setColor(COLORS.READY)
      .setDescription(`${client.user.username} has started!`)
      .setTimestamp();
    const channel = client.channels.get(CHANNELS.logs);
    channel.send(embed);
  }
}

module.exports = ReadyEvent;
