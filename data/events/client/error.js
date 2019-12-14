'use strict';

const { MessageEmbed } = require('discord.js');
const { BotEvent } = require('@structures');
const { Constants: { CHANNELS, COLORS } } = require('@utils');

class ErrorEvent extends BotEvent {
  constructor(client) {
    super(client);
  }

  on(client, data) {
    const embed = new MessageEmbed()
      .setColor(COLORS.ERROR)
      .setDescription(data.length > 2048 ? `${data.slice(0, 2010)}... \nsee logs for more information` : data)
      .setTimestamp();

    client.channels.get(CHANNELS.log).send(embed);
  }
}

module.exports = ErrorEvent;
