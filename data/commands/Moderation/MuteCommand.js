/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      description: 'Mute a person.',
      category: 'Moderation',
      usage: 'mute <user>',
      guildOnly: true,
      aliases: [],
      permLevel: 'moderator',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    let mem; // The selected user (Defined later)
    const embed = new messageEmbed()

    if (!guild.members.get(client.user.id).permissions.has('MANAGE_ROLES')) {
      embed.setDescription('I need `MANAGE_ROLES` to do this.').setColor('RED');
      return sendMessage(embed);
    }

    const muterole = guild.roles.find((r) => r.name == "Muted");
    if (!muterole) {
      embed.setDescription('The role `Muted` does\'t exist.').setColor('RED');
      return sendMessage(embed);
    }

    if(!query) {
      embed.setDescription('You are missing arguments').setColor('RED');
      return sendMessage(embed);
    }

    if (args <= 0 && mentions.length <= 0) {
      embed.setDescription('Please mention a user or specify an id.').setColor('RED');
      return sendMessage(embed);
    }
    
    mem = guild.members.find((m) => m.id === args[0]) || guild.members.find((m) => m.id === mentions.users.first().id);
    if (!mem) {
      embed.setDescription('That user does not exist.').setColor('RED');
      return sendMessage(embed);
    }

    if(!mem.manageable){
      embed.setDescription('That user cannot be muted.').setColor('RED');
      return message.channel.send(embed);
    }

    if(mem.roles.has(muterole.id)){
      mem.roles.remove([muterole.id]).catch(err => console.log(err));
      embed.setDescription(`Unmuted ${mem}`).setColor('GREEN');
      return sendMessage(embed);
    }else{
      mem.roles.add([muterole.id]).catch(err => console.log(err));
      embed.setDescription(`Muted ${mem}`).setColor('GREEN');
      return sendMessage(embed);
    }
  }
}

module.exports = MuteCommand;
