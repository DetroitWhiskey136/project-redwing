/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      description: 'Kicks a user',
      category: 'Moderation',
      usage: 'kick <user>',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    let mem; // The selected user (Defined later)
    const embed = new messageEmbed()

    if (!guild.members.get(client.user.id).permissions.has('KICK_MEMBERS')) {
      embed.setDescription('I need `KICK_MEMBERS` to do this.').setColor('RED');
      return sendMessage(embed);
    }

    if(!query) {
      embed.setDescription('You are missing arguments').setColor('RED');
      return sendMessage(embed);
    }

    if (args.length <= 0 && mentions.length <= 0) {
      embed.setDescription('Please mention a user or specify an id.').setColor('RED');
      return sendMessage(embed);
    }
    
    mem = guild.members.find((m) => m.id === args[0]) || guild.members.find((m) => m.id === mentions.users.first().id);
    if (!mem) {
      embed.setDescription('That user does not exist.').setColor('RED');
      return sendMessage(embed);
    }
    let reason = "Unspecified Reason";
    if(args.length > 2){
      reason = args.join(' ').replace(args[0], '').trim();
    }

    if(!mem.kickable){
      embed.setDescription('That user cannot be kicked.').setColor('RED');
      return message.channel.send(embed);
    }

    mem.kick(reason)
    embed.setDescription(`Kicked ${mem} for \`${reason}\``).setColor('GREEN');
    sendMessage(embed);
  }
}

module.exports = KickCommand;
