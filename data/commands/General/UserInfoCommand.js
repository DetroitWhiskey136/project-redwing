/* eslint-disable max-len, no-unused-vars */
'use strict';
const Command = require('@command/Command');
const { PERM_NAMES } = require('@utils/Constants');
const moment = require('moment');

class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      description: 'Displays a users information',
      category: 'General',
      usage: 'userinfo <user>',
      aliases: ['ui', 'user'],
      enabled: true,
      guildOnly: true,
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    const normargs = args.join(' ').toLowerCase();
    const mentionedMember = guild.member(
      mentions.users.first()) ||
      guild.members.find((m) => m.displayName.toLowerCase() === normargs) ||
      guild.members.find((m) => m.id === args[0]) ||
      guild.members.find((m) => m.user.tag.toLowerCase() === normargs) ||
      guild.members.find((m) => m.user.username.toLowerCase() === normargs) ||
      guild.members.find((m) => m.user.discriminator.toLowerCase() === args.join(' '));
    if (!mentionedMember) {
      const game = author.presence.activity === null ? 'Not Set' : message.author.presence.activity;

      let friendly = client.perms.find((l) => l.level === level).name;
      friendly = PERM_NAMES[friendly] || new Error('this user needs to be looked at as they don\'t have a perm level');

      const embed = new messageEmbed()
        .setTitle(`${member.displayName}'s info`)
        .setColor(member.displayColor)
        .setThumbnail(author.displayAvatarURL({
          size: 2048,
        }))
        .addField('≈ Tag ≈', author.tag, true)
        .addField('≈ ID ≈', author.id, true)
        .addField('≈ Game ≈', game, true)
        .addField('≈ Status ≈',
          author.presence.status === 'dnd' ?
            'Do Not Disturb' :
            author.presence.status === 'offline' ?
              'Offline' :
              author.presence.status === 'idle' ?
                'Idle' :
                author.presence.status === 'online' ?
                  'Online' :
                  'Unknown', true)
        .addField('≈ Highest Role ≈', member.roles.highest, true)
        .addField('≈ Hoisted Color ≈', member.displayHexColor, true)
        .addField('≈ Created At ≈', moment(author.createdTimestamp).format('LLL'), true)
        .addField('≈ Joined At ≈', moment(member.joinedTimestamp).format('LLL'), true)
        .addField('≈ Perm Level ≈', `${level} : ${friendly}`, true)
        .addField('≈ Account Type ≈', member.user.bot === true ? '<:BOT:646453909786984453>' : '<:HUMAN:646454603789107230>', true)
        .setFooter(`Is Bot? ${author.bot} | Deleted? ${member.deleted} | Bannable? ${member.bannable} | Kickable? ${member.kickable} | manageable? ${member.manageable}`);

      channel.send(embed);
    } else {
      const game = mentionedMember.user.presence.activity === null ? 'Not Set' : mentionedMember.user.presence.activity;
      const embed = new messageEmbed()
        .setTitle(`${mentionedMember.displayName}'s info`)
        .setColor(mentionedMember.displayColor)
        .setThumbnail(mentionedMember.user.displayAvatarURL({
          size: 2048,
        }))
        .addField('≈ Tag ≈', mentionedMember.user.tag, true)
        .addField('≈ ID ≈', mentionedMember.user.id, true)
        .addField('≈ Game ≈', game, true)
        .addField('≈ Status ≈',
          mentionedMember.user.presence.status === 'dnd' ?
            'Do Not Disturb' :
            mentionedMember.user.presence.status === 'offline' ?
              'Offline' :
              mentionedMember.user.presence.status === 'idle' ?
                'Idle' :
                mentionedMember.user.presence.status === 'online' ?
                  'Online' :
                  'Unknown', true)
        .addField('≈ Highest Role ≈', mentionedMember.roles.highest, true)
        .addField('≈ Hoisted Color ≈', mentionedMember.displayHexColor, true)
        .addField('≈ Created At ≈', moment(mentionedMember.user.createdTimestamp).format('LLL'), true)
        .addField('≈ Joined At ≈', moment(mentionedMember.joinedTimestamp).format('LLL'), true)
        .setFooter(`Is Bot? ${mentionedMember.user.bot} | Deleted? ${mentionedMember.deleted} | Bannable? ${mentionedMember.bannable} | Kickable? ${mentionedMember.kickable} | manageable? ${mentionedMember.manageable}`);

      channel.send(embed);
    }
  }
}

module.exports = UserInfoCommand;
