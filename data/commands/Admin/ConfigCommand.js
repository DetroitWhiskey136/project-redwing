/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');
const { isBoolean } = require('@utils/Utils');

class ConfigCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'config',
      description: 'Modify the configuration for the current guild',
      category: 'Admin',
      usage: 'config <key> <value>',
      guildOnly: true,
      aliases: ['conf'],
      permLevel: 'administrator',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args: [key, ...value], discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const keys = ['adminlog', 'adminrole', 'prefix', 'sysnotice', 'leaveen', 'leavelog', 'leavemsg', 'modlog', 'modrole', 'welcomeen', 'welcomelog', 'welcomemsg', 'verifyguild', 'verifychannel'];
    const gSettings = database.fn.settings.get(guild.id);
    value = value.join(' ');

    if (key) {
      if (!keys.includes(key.toLowerCase())) {
        return createEmbed(gSettings, 'RED', `__**That key is not valid**__ \n\nPlease have a look below to see the valid keys also the example is fool proof probably. \n\nexample: \`${prefix}config prefix !\``);
      } else {
        database.fn.settings.update(guild.id, { key, value: isBoolean(value) });
        return createEmbed(database.fn.settings.get(guild.id), 'BLUE', `Successfully changed \`${key}\` to \`${value}\``);
      }
    } else {
      return createEmbed(gSettings, '#00ffff', `To set a option below please input a key and a value \n\nexample: \`${prefix}config prefix !\``);
    }

    function createEmbed(settings, color, description) {
      const embed = new messageEmbed()
        .setTitle(`${guild.name}'s Settings`)
        .setColor(color)
        .setDescription(description);
      for (const i in settings) {
        let array = [];
        for (const prop in settings[i]) {
          array.push(`${prop}: ${settings[i][prop]}`);
        }
        embed.addField(i, array.join('\n'));
      }

      sendMessage(embed);
    }
  }
}

module.exports = ConfigCommand;
