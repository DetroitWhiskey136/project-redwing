'use strict';
const chalk = require('chalk');
const moment = require('moment');

/**
 * Basic Logging
 */
class Logger {
  /**
   * Gets the current timestamp
   */
  static get timestamp() {
    return `[${moment().format('MM/DD/YYYY HH:mm:ss')}]`;
  }

  /**
   * LOG
   * @param {String} content
   */
  static log(content) {
    return console.log(`${chalk.cyanBright(` ⬤  LOG ${this.timestamp}`)} ${content}`);
  }
  /**
   * WARN
   * @param {String} content
   */
  static warn(content) {
    return console.log(`${chalk.yellowBright(` ⬤  WAR ${this.timestamp}`)} ${content}`);
  }
  /**
   * ERROR
   * @param {String} content
   */
  static error(content) {
    return console.log(`${chalk.redBright(` ⬤  ERR ${this.timestamp}`)} ${content}`);
  }
  /**
   * DEBUG
   * @param {String} content
   */
  static debug(content) {
    return console.log(`${chalk.blueBright(` ⬤  DBG ${this.timestamp}`)} ${content}`);
  }
  /**
   * COMMAND
   * @param {String} content
   */
  static cmd(content) {
    return console.log(`${chalk.magenta(` ⬤  CMD ${this.timestamp}`)} ${content}`);
  }
  /**
   * READY
   * @param {String} content
   */
  static ready(content) {
    return console.log(`${chalk.greenBright(` ⬤  RDY ${this.timestamp}`)} ${content}`);
  }
  /**
   * UNAUTHORIZED
   * @param {String} content
   */
  static unauthorized(content) {
    return console.log(`${chalk.black.bgRedBright(` ⬤  401 ${this.timestamp}`)} ${content}`);
  }
}
module.exports = Logger;
