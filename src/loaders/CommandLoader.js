'use strict';

const { Collection } = require('discord.js');
const { requireDirectory } = require('@utils/FileUtils');
const Loader = require('@structures/Loader');

class CommandStore extends Collection {
  fetch(str) {
    str = str.toLowerCase();
    return this.find((c) => c.name.toLowerCase() === str || c.aliases.map((a) => a.toLowerCase()).includes(str));
  }
}

class CommandLoader extends Loader {
  constructor(client) {
    super(client);
    this.required = true;
    this.commands = new CommandStore();
  }

  async load() {
    await requireDirectory(`${process.cwd()}/data/commands`, this.loadSuccess.bind(this), console.error);
    this.client.commands = this.commands;
    return true;
  }

  loadSuccess(Command, fileName, folderName) {
    try {
      const command = new Command(this.client);
      command.name = fileName;
      if (folderName !== 'commands' && command.category === 'none') command.category = folderName;
      this.commands.set(fileName, command);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CommandLoader;
