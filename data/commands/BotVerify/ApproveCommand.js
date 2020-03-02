/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');
const { stripIndents } = require('common-tags');

class ApproveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'approve',
      description: '',
      category: 'BotVerify',
      usage: 'approve <botid>',
      guildOnly: true,
      aliases: ['accept'],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    let e = new messageEmbed();
    const bots = database.fn.bots;

    if(args.length < 2){ // Check if a parameter is supplied
      e.setDescription(`<:denied:482509383893516288> **Please include the bot's ID**`).setColor('RED');
      message.channel.send(e);
    }else{
      if(!bots.has(args[0])){ // Check if bot exists in the enmap
        e.setDescription(`<:denied:482509383893516288> **This bot doesn't exist**`).setColor('RED');
        message.channel.send(e);
      }else{
        const status = bots.get(args[0], 'status');
        if (!status == 'pending-approval'){ // Check if the bot is pending approval
          e.setDescription(`<:denied:482509383893516288> **You cant approve a non pending-approval bot**`).setColor('RED');
          message.channel.send(e);
        }else{
          e.setDescription(`<:approved:482509383918551040> **Approval Message Sent**`).setColor('GREEN');
          message.channel.send(e);
          const owner = bots.get(args[0], 'owner');
          const embedobj = bots.get(args[0], 'embedobj');
          vguild = client.guilds.get('473843909416452116');
          botguild = client.guilds.get('407624561115398164');
          person = botguild.members.find(m => m.id === String(owner));
          kickme = vguild.members.find(m => m.id === String(args[0]));
          devrole = botguild.roles.find(r => r.name === "Bot Developer");
          logchannel = vguild.channels.find(c => c.name === 'approved-denied-logs');
          waitingapproval = vguild.channels.find(c => c.name === 'waiting-approval');
          managerqueue = vguild.channels.find(c => c.name === 'manager-queue');
          managerrole = vguild.roles.get('473844948735623178');
          const name = bots.get(args[0], 'name');
          e
            .setTitle('Bot Approved')
            .setColor('#1ABC9C')
            .addField('Approved Bot', name, true)
            .addField('Bot Owner', person.user.tag, true)
            .addField('Bot Approver', author.tag, true)
            .setThumbnail('https://cdn.discordapp.com/attachments/371149983279480832/512055214543470608/certified.png');
          logchannel.send(e);
          e
            .setTitle('New Bot Approved')
            .setColor('GREEN')
            .setDescription(`${author.username} has approved a new bot ${name}`)
            .addField('Invite Link', `https://discordapp.com/oauth2/authorize?client_id=${args[0]}&scope=bot&permissions=0`, true)
          managerqueue.send(embe);
          bots.set(args[0], 'approved', 'status');
          e.setDescription(`Your bot <@${args[0]}> was approved by our team! :tada:`).setColor('GREEN');
          waitingapproval.fetchMessage(embedobj).then(m => m.react('482509383918551040')); // DBMBV Approved emoji
          bots.set(args[0], null, "embedobj");
          person.send(e);
          person.addRole(devrole);
          kickme.kick();
        }
      }
    }
  }
}

module.exports = ApproveCommand;
