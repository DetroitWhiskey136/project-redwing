'use strict';

const discord = require('discord.js');

/**
 * This class provides a object of options for the run method
 */

/* { totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage } */
class CommandContext {
  /**
   * Available properties for this class
   * @param {*} options properties
   * @property `totalLength`
   * @property `message`
   * @property `member`
   * @property `guild`
   * @property `author`
   * @property `channel`
   * @property `client`
   * @property `voiceChannel`
   * @property `level`
   * @property `prefix`
   * @property `database`
   * @property `query`
   * @property `args`
   * @property `sendMessage`
   */
  constructor(options) {
    this.totalLength = options.totalLength;

    this.message = options.message;
    this.mentions = options.message.mentions;
    this.member = options.message.member;
    this.guild = options.message.guild;
    this.author = options.message.author;
    this.channel = options.message.channel;
    this.client = options.message.client;
    this.voiceChannel = this.member && this.member.voice && this.member.voice.channel;

    this.level = options.level;
    this.prefix = options.prefix;
    this.database = options.message.client.database;
    this.query = options.query;
    this.args = options.args;

    this.discord = discord;

    this.sendMessage = (c) => options.message.channel.send(c);
    this.messageEmbed = discord.MessageEmbed;
  }
}

module.exports = CommandContext;
