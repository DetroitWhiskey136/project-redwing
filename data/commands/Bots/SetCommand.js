/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class EditCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'edit',
      description: 'Edit the description or prefix of a bot.',
      category: 'Bots',
      usage: 'edit <prefix|description> <new_prefix|new_desc>',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const bots = database.fn.bots
    const e = new messageEmbed()
    if (args.length > 3) {
      const user = server.members.get(args[2]) || server.members.get(mentions.users.first().id);
      if (user) {
        if (user.user.bot == true) {
          if (args[1] == "prefix") {
            if (bots.get(user.user.id, 'owner') == member.id) {
              // Set the prefix
              bots.set(user.user.id, args[3], "prefix");
              user.setNickname(`[${bots.get(user.user.id, "prefix")}] ${bots.get(user.user.id, "name")}`);
              e.setDescription(`<:approved:482509383918551040> Changed bot prefix.`).setColor('GREEN');
              message.channel.send(e);
            } else if (member.roles.some(r => ['Admin', 'Moderator'].includes(r.name))) {
              // Forcefully set the prefix
              bots.set(user.user.id, args[3], "prefix");
              user.setNickname(`[${bots.get(user.user.id, "prefix")}] ${bots.get(user.user.id, "name")}`);
              e.setDescription(`<:approved:482509383918551040> Forcefully changed the bot prefix.`).setColor('GREEN');
              message.channel.send(e);
            } else {
              // You are not the owner.
              e.setDescription(`<:denied:482509383893516288> You are not the bot owner or staff!`).setColor('RED')
              message.channel.send(e);
            }
          }
          else if (args[1] == "description" || args[1] == "desc") {
            if (args.length > 3) {
              const newdesc = args.join(' ').replace(args[0], '').replace(args[1], '').replace(args[2], '').replace(' ', '');
              if (bots.get(user.user.id, 'owner') == message.member.id) {
                // Set the description
                bots.set(user.user.id, newdesc, "description");
                e.setDescription(`<:approved:482509383918551040> Changed bot description.`).setColor('GREEN')
                message.channel.send(e);
              } else if (member.roles.some(r => ['Admin', 'Moderator'].includes(r.name))) {
                // Forcefully set the description
                bots.set(user.user.id, newdesc, "description");
                e.setDescription(`<:approved:482509383918551040> Forcefully changed the bot description.`).setColor('GREEN')
                message.channel.send(e);
              } else {
                // You are not the owner.
                e.setDescription(`<:denied:482509383893516288> You are not the bot owner or staff!`).setColor('RED')
                message.channel.send(e);
              }
            } else {
              // No description specified
              e.setDescription(`<:denied:482509383893516288> Please specify a new description.`).setColor('RED');
              message.channel.send(e);
            }
          }
          else if (args[1] == "status" || args[1] == "stat") {
            if (args.length > 3) {
              if (member.roles.some(r => ['Admin'].includes(r.name))) {
                // Set the status
                bots.set(user.user.id, args[3], "status");
                e.setDescription(`<:approved:482509383918551040> Changed the bot status to \`${bots.get(user.user.id, "status")}\`.`).setColor('GREEN')
                message.channel.send(e);
              } else {
                e.setDescription(`<:denied:482509383893516288> You cannot do this. This is for Admins only.`).setColor('RED');
                message.channel.send(e);
              }
            } else {
              // No status specified
              e.setDescription(`<:denied:482509383893516288> Please specify a new status.`).setColor('RED');
              message.channel.send(e);
            }
          }
          else {
            // Action not specified.
            e.setColor('RED');
            if (member.roles.some(r => ['Admin'].includes(r.name))) {
              e.setDescription(`<:denied:482509383893516288> **Usage:** \`${prefix}edit [prefix|description|status] <@bot|botid> <new_prefix|new_desc|new_status>\``);
            } else {
              e.setDescription(`<:denied:482509383893516288> **Usage:** \`${prefix}edit [prefix|description] <@bot|botid> <new_prefix|new_desc>\``);
            }
            message.channel.send(e);
          }
        } else {
          // User is not a bot
          e.setDescription(`<:denied:482509383893516288> That user is not a bot.`).setColor('RED');
          message.channel.send(e);
        }
      } else {
        // User doesnt exist
        e.setDescription(`<:denied:482509383893516288> That user doesn't exist.`).setColor('RED');
        message.channel.send(e);
      }
    } else {
      // Less than 3 args
      e.setColor('RED');
      if (member.roles.some(r => ['Admin'].includes(r.name))) {
        e.setDescription(`<:denied:482509383893516288> **Usage:** \`${prefix}edit [prefix|description|status] <@bot|botid> <new_prefix|new_desc|new_status>\``);
      } else {
        e.setDescription(`<:denied:482509383893516288> **Usage:** \`${prefix}edit [prefix|description] <@bot|botid> <new_prefix|new_desc>\``);
      }
      message.channel.send(e);
    }
  }
}

module.exports = EditCommand;
