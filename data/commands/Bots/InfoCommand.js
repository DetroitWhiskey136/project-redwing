/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      description: 'Get information about a bot.',
      category: 'Bots',
      usage: 'info <@bot>',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const bots = database.bots;
    const e = new messageEmbed().setFooter(author.username, author.avatarURL);

    if (args.length !== 1) {
      e.setDescription(`<:denied:482509383893516288> **Please mention a bot to see its information.**`).setColor('RED');
      return sendMessage(e);
    }
    const user = guild.members.cache.get(args[0]) || guild.members.cache.get(mentions.users.first().id);

    if (user.user.bot === false) { // Mention not a bot.
      e.setDescription(`<:denied:482509383893516288> **This user is not a bot.**`).setColor('RED');
      return sendMessage(e);
    }
    if (!bots.has(user.id)) { // Bot is non-existant
      e.setDescription(`<:denied:482509383893516288> **That bot doesn't exist!**`).setColor('RED');
      return sendMessage(e);
    }
    const botid = user.id;
    const a = new messageEmbed();
    a.setAuthor(member.user.username, member.user.avatarURL);
    a.setColor('#36393E');
    a.addField('Owner', `<@${bots.get(botid, 'owner')}>`, true);
    a.addField('Bot', `<@${bots.get(botid, 'id')}>`, true);
    let status = 'Error'; // Will be changed below
    if (bots.get(botid, 'status') === 'normal' || bots.get(botid, 'status') === 'approved') {
      status = 'Bot';
    } else if (bots.get(botid, 'status') === 'pending-approval') {
      status = 'Pending Approval';
    } else if (bots.get(botid, 'status') === 'dev') {
      status = 'Developmental';
    } else if (bots.get(botid, 'status') === 'certified') {
      status = 'Certified';
    } else if (bots.get(botid, 'status') === 'pending-certification') {
      status = 'Bot\n*Certification Pending*';
    } else if (bots.get(botid, 'status') === 'official') {
      status = 'Official Bot';
    }
    a.addField('Bot Type', status, true);
    a.addField('Prefix', `\`${bots.get(botid, 'prefix')}\``, true);
    if (bots.get(botid, 'status') !== 'official') { // Not an official bot...
      a.addField('Monthly Votes', bots.get(botid, 'monthly_votes'), true);
      a.addField('Total Votes', bots.get(botid, 'alltime_votes'), true);
    }
    a.addField('Description', bots.get(botid, 'description'), true);
    sendMessage(a);
  }
}

module.exports = InfoCommand;
