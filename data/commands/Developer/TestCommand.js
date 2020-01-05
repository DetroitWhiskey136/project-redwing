/* eslint-disable semi, no-unused-vars, no-unused-expressions, max-depth */
'use strict';
const Command = require('@command/Command');
const { isRoleID, isRoleMention } = require('@utils/RoleUtils')
const { toProperCase } = require('@utils/Utils');
const Doc = require('discord.js-docs');

class TestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'test',
      description: 'only for developer, if you don\t know what this is don\'t touch it ',
      category: 'Developer',
      usage: 'test',
      guildOnly: true,
      permLevel: 'botadmin',
      enabled: true,
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    const cat = args.join(' ');

    const myCommands = guild ?
      client.commands.filter((cmd) => this.client.levelCache[cmd.conf.permLevel.toLowerCase()] <= level) :
      client.commands.filter((cmd) => this.client.levelCache[cmd.conf.permLevel.toLowerCase()] <= level && cmd.conf.guildOnly !== true);
    const CommandNames = myCommands.keyArray();

    const embed = new messageEmbed()
      .setColor(member.displayColor)
      .setFooter(member.displayName, member.user.displayAvatarURL({ format: 'png' }));


    if (query) {
      const commands = [];

      CommandNames.forEach((cmd) => {
        const command = myCommands.get(cmd).help;
        if (command.category.toLowerCase() === cat.toLowerCase()) {
          commands.push(command);
        }
      });

      const output = [];
      commands.forEach((cmd) => {
        output.push(`**${prefix}${cmd.name}:**  ⟶  ${cmd.description}`);
      });

      if (commands.length <= 0) {
        try {
          let command = query;
          if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return;
            embed.addField(toProperCase(command.help.name), `${command.help.description} \nusage -- ${command.help.usage} \naliases -- ${command.conf.aliases.join(', ')}`);
            channel.send(embed);
          }
        } catch (_) {
          embed.setTitle('Something went wrong!')
            .setDescription(`It seems **${query}** not a valid category, or a command name`);
          channel.send(embed);
        }
      } else {
        embed.setTitle('Command List')
          .setDescription(`Here are the available commands from the category: **${query}**.\n\n` +
            `${output.join('\n')}`);
        channel.send(embed);
      }
    }

    if (!query) {
      const myCategories = [];

      CommandNames.forEach((cmd) => {
        const category = myCommands.get(cmd).help.category;
        if (!myCategories.includes(category)) {
          myCategories.push(`${category}`);
        }
      });
      embed.setTitle('Category List')
        .setDescription('Please select a category to see its available commands.\n' +
          `**Usage: ${prefix}help <category>** \n\n` +
          `${myCategories.join('\n')} `);
      channel.send(embed);
    }
  }
}

module.exports = TestCommand;
