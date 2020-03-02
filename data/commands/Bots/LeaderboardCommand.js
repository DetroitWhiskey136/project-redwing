/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class LeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leaderboard',
      description: 'Top bots of the month',
      category: 'Bots',
      usage: 'leaderboard',
      guildOnly: true,
      aliases: ['lb', 'top'],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const leaderboard = database.bots.indexes;
    const sorted = leaderboard.sort((a, b) => b.monthly_votes - a.monthly_votes);
    const top5 = sorted.splice(0, 5);
    const list = [];
    let num = 1;
    for(const data of top5) {
      if(!(["official", "dev"].includes(data.status) || data.monthly_votes === 0)){
        list.push(`**${num})** ${client.users.get(data.id)} - **${data.monthly_votes}**`);
        num=num+1
      }
    }
    const e = new messageEmbed()
      .setAuthor(`Monthly Leaderboard`, author.avatarURL())
      .setColor('#36393E')
      .setDescription((list.length === 0) ? "No bots have votes yet" : list);
    message.channel.send(e);
  }
}

module.exports = LeaderboardCommand;
