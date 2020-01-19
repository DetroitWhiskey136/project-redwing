/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

class VoteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'vote',
      description: 'Vote for a bot. Can be done once every 12 hours.',
      category: 'Bots',
      usage: 'vote <@bot|botID>',
      guildOnly: true,
      aliases: [],
      permLevel: 'user',
    });
  }

  run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const embed = new messageEmbed().setColor('RED').setTimestamp();
    const cooldowns = database.fn.cooldowns // User Cooldowns
    const bots = database.fn.bots // Bot data
    let wait = `You have to wait x hours, x minutes, x seconds.`
    function getWait(dt2, dt1) {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      hours /= (60 * 60);
      if (hours < 12) {
        minutes = Math.floor(diff/1000/60);  // high level math here. Do not touch!
        seconds = Math.floor(diff/1000);
        wait = `You have to wait ${hours} hours, ${(hours*60)%minutes} minutes, ${(minutes*60)%seconds} seconds.`;
        return false;
      } else {
        return true;
      }
    }

    cooldowns.ensure(author.id, { vote: null });

    if (guild.id != '407624561115398164') {
      embed.setDescription(`This command can only be used in ${client.guilds.get('407624561115398164').name}`);
      return sendMessage(embed);
    } else if (cooldowns.get(author.id, 'vote') != null || getWait(new Date(cooldowns.get(author.id, 'vote')), new Date()) == true) {
      vote();
    } else {
      embed.setDescription(`${wait}`);
      sendMessage(embed);
    }
    

    function vote(){
      if (mentions.users.size != 1) { //checks if the member mentioned someone
        embed.setDescription("<:denied:482509383893516288> **Please mention a bot to give it a vote.**")
        sendMessage(embed);
      } else if (mentions.users.first().bot == false) { //checks if the mentioned user is a bot
        embed.setDescription("<:denied:482509383893516288> **This user is not a bot.**")
        sendMessage(embed);
      }
      else {
        const id = message.mentions.users.first().id;
        result = bots.has(id);
        if (result == false) { //checks if that bot exists in enmap bots
          embed.setDescription("<:denied:482509383893516288> **That bot doesn't exist.**")
          sendMessage(embed);
        }
        else {
          const status = bots.get(id, 'status'); //checks if the bot is a non-votable bot
          if (status == "dev") {
            embed.setDescription("<:denied:482509383893516288> **You cannot vote for a Dev Bot.**")
            sendMessage(embed);
          }
          else if (status == "official") {
            embed.setDescription("<:denied:482509383893516288> **You cannot vote for an Official Bot.**")
            sendMessage(embed);
          }
          else if (status == "pending-approval") {
            embed.setDescription("<:denied:482509383893516288> **That bot doesn't exist.**")
            sendMessage(embed);
          }
          else {
            const owner = bots.get(id, 'owner');
      
            if (author.id == owner) { //checks if the bot is owned by message author
              embed.setDescription("<:denied:482509383893516288> **You can't vote for your own bot.**")
              sendMessage(embed);
      
            }
            else {
              if (cooldowns.has(message.author.id, 'vote')) { // Adds cooldown to the message author for 12 hours
                const now = String(new Date());
                cooldowns.set(author.id, now, 'vote');
              }
              else {
                const now = String(new Date());
                cooldowns.ensure(author.id, { timestamp: now });
              }
      
              const current = Number(bots.get(id, 'alltime_votes')) + 1;
              const currentm = Number(bots.get(id, 'monthly_votes')) + 1;
              bots.set(String(id), String(current), 'alltime_votes'); //sets the votes of the bots
              bots.set(String(id), String(currentm), 'monthly_votes');
              embed.setDescription(`<:approved:482509383918551040> **You voted for ${mentionedUser}. Come back in 12 hours to vote again!**`)
              sendMessage(embed);
              logserver = client.guilds.get('473843909416452116');
              logchannel = logserver.channels.find(element => element.name === 'vote-logs');
              embed //sends a log message(in the staff server)
                .setTitle(`${member.user.username} | ${mentionedUser.username}`)
                .setColor("RANDOM")
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                .setThumbnail(`${member.user.displayAvatarURL}`)
                .setDescription(`${member} voted for ${mentionedUser}!`);
              logchannel.send(embed);
      
            }
          }
      
        }
      }
    }

  }
}

module.exports = VoteCommand;