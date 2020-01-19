/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class TemplateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'alltime',
      description: 'Gets the alltime bot leaderboard',
      category: 'Bots',
      usage: 'alltime',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const leaderboard = database.bots.indexes;
    const sorted = leaderboard.sort((a, b) => b.alltime_votes - a.alltime_votes);
    const top5 = sorted.splice(0, 5);
    const list = [];
    let num = 1;
    for(const data of top5) {
        if(data.status != "official" || data.status != "de"){
            list.push(`**${num})** ${client.users.get(data.id)} - **Votes ${data.alltime_votes}**`);
            num=num+1
        }
    }
    const e = new messageEmbed()
      .setAuthor(`All Time Leaderboard`, author.avatarURL())
      .setColor('#36393E')
      .setDescription(list);
    message.channel.send(e);
  }
}

module.exports = TemplateCommand;
