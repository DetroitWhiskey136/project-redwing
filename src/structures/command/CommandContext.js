'use strict';

class CommandContext {
  constructor(options) {
    this.message = options.message;
    this.mentions = this.message.mentions;
    this.member = this.message.member;
    this.guild = this.message.guild;
    this.author = this.message.author;
    this.channel = this.message.channel;
    this.client = this.message.client;

    this.prefix = options.prefix;
    this.command = options.command;
    this.query = options.query;
    this.args = options.args;

    this.database = this.client.database;
    this.guildData = options.guildData;
    this.flags = {};
  }
}

module.exports = CommandContext;
