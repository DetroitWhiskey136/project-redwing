/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const Command = require('@command/Command');
const moment = require('moment');
const os = require('os');

class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      description: 'Displays information about the bot',
      category: 'General',
      usage: 'botinfo',
      aliases: ['bi'],
      enabled: true,
      guildOnly: true,
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    const guilds = client.guilds.cache.array();
    const chan = message.channel.name;

    let members = 0;
    guilds.forEach((g) => {
      members = (members) += g.memberCount;
    });

    const embed = new messageEmbed()
      .setTitle(`This is ${client.user.username}'s info!`)
      .setColor(member.displayColor)
      .setImage(client.user.displayAvatarURL({ format: 'png', size: 64 }))
      .addField('Full Username:', client.user.tag, true)
      .addField('ID:', client.user.id, true)
      .addField('Started At: Danno Time', moment(client.readyTimestamp).format('LLL'), true)
      .addField('Uptime:', moment(client.readyTimestamp).fromNow(), true)
      .addField('Guilds:', client.guilds.cache.size, true)
      .addField('Users', members, true)
      .addField('Discord.js:', `Version ~ ${discord.version}`, true)
      .addField('Node:', `Version ~ ${process.versions.node}`, true)
      .addField('RAM Usage:', `${((process.memoryUsage().heapUsed / os.freemem()) * 100).toFixed(2)}%`, true)
      .addField('Ping:', `${client.ws.ping.toFixed(2)} MS`, true)
      .addField('Avatar URL:', `[Link to my profile avatar](${client.user.displayAvatarURL({ format: 'png', size: 2048 })})`)
      .setFooter(`${member.displayName} | #${chan.charAt(0).toUpperCase() + chan.slice(1)}  |  ${moment().format('LLL')}`);

    channel.send(embed);
  }
}

module.exports = BotInfoCommand;
