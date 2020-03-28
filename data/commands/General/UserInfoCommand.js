/* eslint-disable max-len, no-unused-vars */
'use strict';
const Command = require('@command/Command');
const { PERM_NAMES } = require('@utils/Constants');
const moment = require('moment');
const { getMember } = require('@utils/Utils');

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
    const embed = new messageEmbed();
    const guildMember = getMember(query, message);

    let friendly = 'Not Available';

    if (!guildMember) {
      embed.setDescription('Member not found');
    } else {
      const user = guildMember.user;
      let game = user.presence.activity === null ? 'Not Set' : user.presence.activities.map((a) => a.name).filter((a) => a !== 'Custom Status');

      const memberLevel = client.getPerm(guildMember);
      if (memberLevel >= 0) {
        friendly = client.perms.find((l) => l.level === memberLevel).name;
        friendly = PERM_NAMES[friendly] || new Error('this user needs to be looked at as they don\'t have a perm level');
      }

      embed
        .setTitle(`${guildMember.displayName}'s info`)
        .setColor(guildMember.displayColor)
        .setThumbnail(user.displayAvatarURL({
          size: 2048,
        }))
        .addField('≈ Tag ≈', user.tag, true)
        .addField('≈ ID ≈', user.id, true)
        .addField('≈ Game ≈', game.length >= 1 ? game : 'Not playing a game', true)
        .addField('≈ Status ≈',
          user.presence.status === 'dnd' ?
            'Do Not Disturb' :
            user.presence.status === 'offline' ?
              'Offline' :
              user.presence.status === 'idle' ?
                'Idle' :
                user.presence.status === 'online' ?
                  'Online' :
                  'Unknown', true)
        .addField('≈ Highest Role ≈', guildMember.roles.highest, true)
        .addField('≈ Hoisted Color ≈', guildMember.displayHexColor, true)
        .addField('≈ Created At ≈', moment(user.createdTimestamp).format('LLL'), true)
        .addField('≈ Joined At ≈', moment(guildMember.joinedTimestamp).format('LLL'), true)
        .addField('≈ Perm Level ≈', `${memberLevel} : ${friendly}`, true)
        .addField('≈ Account Type ≈', guildMember.user.bot === true ? '<:BOT:646453909786984453>' : '<:HUMAN:646454603789107230>', true)
        .setFooter(`Is Bot? ${user.bot} | Deleted? ${guildMember.deleted} | Banable? ${guildMember.banable} | Kickable? ${guildMember.kickable} | manageable? ${guildMember.manageable}`);

      channel.send(embed);
    }
  }
}

module.exports = UserInfoCommand;
