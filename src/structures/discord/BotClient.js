'use strict';
const { Client, Collection } = require('discord.js');
const Database = require('@database/Database');
const Logger = require('@utils/Logger');
const permLevels = require('@permissions/Levels');
const { promisify } = require('util');
const path = require('path');

/**
 * Represents the bots client
 */
class BotClient extends Client {
  /**
   * Avalable properties for the client
   * @param {Object} options - Same as the normal client options
   */
  constructor(options) {
    super(options);
    this.logger = Logger;
    this.database = new Database(this);

    this.config = require('../../../data/config');
    this.perms = permLevels;

    // Commands & Aliases are put into a collection
    this.commands = new Collection;
    this.aliases = new Collection;
    this.events = new Collection;

    // async shortcut to setTimeout
    this.wait = promisify(setTimeout);
  }

  permLevel(message) {
    let permlvl = 0;

    const permOrder = this.perms.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }

  getPerm(member) {
    let permlvl = 0;

    const permOrder = this.perms.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (member.guild && currentLevel.guildOnly) continue;
      if (currentLevel.checkMember(member)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }

  /**
   * LOAD COMMAND
   *
   * Used to simplify loading commands from multiple locations
   * @param {String} cmdPath
   * @param {String} cmdName
   */
  loadCommand(cmdPath, cmdName) {
    try {
      const props = new (require(`${cmdPath}${path.sep}${cmdName}`))(this);
      // this.logger.debug(`Loading Command: ${props.help.name}. ~ ${props.help.description}`);
      props.conf.location = cmdPath;
      props.conf.fileName = cmdName;
      if (props.init) {
        props.init(this);
      }
      if (props.conf.enabled === false) return;
      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (error) {
      return `Unable to load command ${cmdName}: ${error.message}`;
    }
  }

  /**
   * UNLOAD COMMAND
   *
   * Used to simplify unloads commands from multiple locations
   * @param {String} cmdPath
   * @param {String} cmdName
   */
  async unloadCommand(cmdPath, cmdName) {
    let command;
    if (this.commands.has(cmdName)) {
      command = this.commands.get(cmdName);
    } else if (this.aliases.has(cmdName)) {
      command = this.commands.get(this.aliases.get(cmdName));
    }

    if (!command) return `The command '${cmdName}' doesn't exist, it's not an alias either.`;

    if (command.shutdown) {
      await command.shutdown(this);
    }

    delete require.cache[require.resolve(`${cmdPath}${path.sep}${command.conf.fileName}`)];
    return false;
  }

  /**
   * LOAD EVENT
   *
   * Used to simplify loading events from multiple locations
   * @param {String} evtPath
   * @param {String} evtName
   */
  loadEvent(evtPath, evtName) {
    try {
      const props = new (require(`${evtPath}${path.sep}${evtName}`))(this);
      // this.logger.log(`Loading Event: ${props.help.name}. ~ ${props.help.description}`, 'debug');
      props.conf.location = evtPath;
      if (props.init) {
        props.init(this);
      }
      if (props.conf.enabled === false) return;
      this.events.set(props.help.name, props);
      const event = new (require(`${evtPath}/${evtName}`))(this);
      this.on(props.help.name, (...args) => event.run(this, ...args));
      return false;
    } catch (error) {
      return `Unable to load event ${evtName}: ${error.message}`;
    }
  }

  /**
   * UNLOAD EVENT
   *
   * Used to simplify unloads events from multiple locations
   * @param {String} evtPath
   * @param {String} evtName
   */
  async unloadEvent(evtPath, evtName) {
    let event;
    if (this.event.has(evtName)) {
      event = this.event.get(evtName);
    } else if (this.aliases.has(evtName)) {
      event = this.event.get(this.aliases.get(evtName));
    }

    if (!event) return `The command '${evtName}' doesn't exist, it's not an alias either.`;

    if (event.shutdown) {
      await event.shutdown(this);
    }

    delete require.cache[require.resolve(`${evtPath}${path.sep}${evtName}.js`)];
    return false;
  }
}

module.exports = BotClient;
