/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const { MessageEmbed } = require('discord.js');
const Gamedig = require('gamedig');
const Command = require('@command/Command');

class ServerStatusCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fivemstatus',
      description: 'Comming soon',
      category: 'FiveM',
      usage: 'fivemstatus',
      enabled: true,
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    const embed = new MessageEmbed()
      .setColor(member.displayHexColor)
      .setFooter(member.displayName, author.displayAvatarURL({ format: 'png' }));

    Gamedig.query({
      type: 'fivem',
      host: '192.168.1.184',
      port: '20197',
    }).then((state) => {
      // console.log(state);
      const rawdata = state.raw;
      const players = state.raw.players;
      const playerList = [];
      players.forEach((p) => {
        playerList.push(`${p.name} (${p.id})`);
      });
      embed.setTitle(`${rawdata.hostname} (${rawdata.gametype})`);
      embed.setDescription(`**__Resources__**: | ${rawdata.info.resources.join(' | ')} |`);
      embed.addField('Players', playerList.length >= 1 ? playerList.join('\n') : 'No one is playing right now');

      channel.send(embed);
    }).catch((error) => {
      console.log('server is offline', error);
    });
    // return null;
  }
}

module.exports = ServerStatusCommand;
