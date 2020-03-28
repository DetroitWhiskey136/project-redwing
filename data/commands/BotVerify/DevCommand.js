/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');
const { stripIndents } = require('common-tags');

class DevCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dev',
      description: 'Approve a bot as a developemental bot.',
      category: 'BotVerify',
      usage: 'dev <botid>',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const bots = database.fn.bots;
    const e = new messageEmbed();
    if (args.length < 2) { // Check if a parameter is supplied
      e.setDescription(`<:denied:482509383893516288> **Please include the bots' ID**`).setColor('RED');
      return sendMessage(e);
    } else {
      if (!bots.has(args[0])) { // Check if bot exists in the enmap
        e.setDescription(`<:denied:482509383893516288> **This bot doesn't exist**`).setColor('RED');
        return sendMessage(e);
      }
      const status = bots.get(args[0], 'status');
      if (!status === 'pending-approval') { // Check if the bot is pending approval
        e.setDescription(`<:denied:482509383893516288> **You cant approve a non pending-approval bot**`).setColor('RED');
        sendMessage(e);
      } else {
        e.setDescription(`<:approved:482509383918551040> **Approval Message Sent**`).setColor('GREEN');
        sendMessage(e);
        const owner = bots.get(args[0], 'owner');
        const embedobj = bots.get(args[0], 'embedobj');
        const vguild = client.guilds.get('473843909416452116');
        const botguild = client.guilds.get('407624561115398164');
        const person = botguild.members.find((m) => m.id === owner);
        const kickme = vguild.members.find((m) => m.id === args[0]);
        const devrole = botguild.roles.find((r) => r.name === 'Bot Developer');
        const logchannel = vguild.channels.find((c) => c.name === 'approved-denied-logs');
        const waitingapproval = vguild.channels.find((c) => c.name === 'waiting-approval');
        const managerqueue = vguild.channels.find((c) => c.name === 'manager-queue');
        const name = bots.get(args[0], 'name');
        e
          .setTitle('Developmental Bot Approved')
          .setColor('#1ABC9C')
          .addField('Approved Bot', name, true)
          .addField('Bot Owner', person.user.tag, true)
          .addField('Bot Approver', member.user.tag, true)
          .setThumbnail('https://cdn.discordapp.com/attachments/371149983279480832/512055214543470608/certified.png');
        logchannel.send(e);
        e
          .setTitle('New Developmental Bot Approved')
          .setColor('GREEN')
          .setDescription(`${author.username} has approved a new bot ${name}`)
          .addField('Invite Link', `https://discordapp.com/oauth2/authorize?client_id=${args[0]}&scope=bot&permissions=0`, true);
        managerqueue.send(e);
        bots.set(String(args[1]), 'dev', 'status');
        e
          .setColor('GREEN')
          .setDescription(`Your bot <@${args[0]}> was approved by our team! :tada:`);
        waitingapproval.fetchMessage(embedobj).then((m) => m.react('482509383918551040')).catch((error) => client.logger.error(error));
        bots.set(args[0], null, 'embedobj');
        person.send(e);
        person.addRole(devrole);
        kickme.kick();
      }
    }
  }
}

module.exports = DevCommand;
