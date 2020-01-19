/* eslint-disable no-unused-vars, max-len */
'use strict';

const Command = require('@command/Command');

// Default values (It will be changed later...)
let msg1 = "Error";
let msg2 = "Error";
let msg3 = "Error";
let msg4 = "Error";


class SubmitCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'submit',
      description: 'Submit your bot to get it added on the server.',
      category: 'Bots',
      usage: 'submit',
      guildOnly: true,
      permLevel: 'user',
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    const bots = database.fn.bots;
    const embed = new messageEmbed();
    embed.setTitle('Redwing Bot Submision').setColor('GREEN');

    embed.setDescription(`[${member}]\nYou are submitting a bot to Redwing Bots.\n\n*Type **cancel** to stop.*\n\`What is your bot's name?\``);
    message.channel.send(embed).then(m => {
      let quest = 0;
      getMessages(m, quest);
    });

    function getMessages(m, ques){
      const filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
        if(collected.first().content === "cancel"){
          embed.setDescription(`[${member}]\n\nCanceled!`);
          return m.edit(e);
        }
        if(quest == 0){
          quest = 1;
          msg1 = collected.first().content;
          collected.first().delete();
          embed.setDescription(`[${member}]\n\n\`What is your bot's prefix?\``);
          m.edit(embed);
          return getMessages(m, quest);
        }else if(quest == 1){
          quest = 2;
          msg2 = collected.first().content;
          collected.first().delete();
          embed.setDescription(`[${member}]\n\n\`What is your bot\'s description?\`\n__NOTE: the description cannot have a new line!!__`);
          m.edit(embed);
          return getMessages(m, quest);
        }else if(quest == 2){
          quest = 3;
          msg3 = collected.first().content;
          collected.first().delete();
          embed.setDescription(`[${member}]\n\n\`What is your bot's ID?\``);
          m.edit(embed);
          return getMessages(m, quest);
        }else if(quest == 3){
          msg4 = collected.first().content;
          collected.first().delete();
          client.users.fetch(msg4).then(a => {
            if(a.bot){
              sendFinilization(m);
            }else{
              embed.setDescription(`[${member}]\n\nThe id provided is not a bot id, please try again.`).setColor('RED');
              m.edit(embed);
            }
          }).catch(error => {
            embed.setDescription(`[${member}]\n\nThat user does not exist, please re-submit.`).setColor('RED');
            m.edit(embed);
          });
          return;
        }
      }).catch(err => {
        console.log(err);
        embed.setDescription(`:clock1: ${member}, hello? Cancelled`).setColor('RED');
        m.edit(embed);
      });
    }

    function sendFinilization(m){
      vserver = client.guilds.get('473843909416452116');
      waitingapproval = vserver.channels.find(c => c.name === 'waiting-approval');  
      embed
        .setTitle(`New bot submitted!`)
        .setColor(`#e67e22`)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=${msg4}&scope=bot&permissions=0`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/371149983279480832/512055211528028172/new_bot.png`)
        .setTimestamp()
        .addField('Author', `${msg.author}`, true)
        .addField('Name', `${msg1}`, true)
        .addField('Prefix', `${msg2}`, true)
        .addField('Bot ID', `${msg4}`, true)
        .addField('Description', `${msg3}`, true)
        .addField('Invite Link', `https://discordapp.com/oauth2/authorize?client_id=${msg4}&scope=bot&permissions=0`, true)
        .setFooter(`Submitted by: ${msg.member.user.username} (${msg.member.id})`);
    if(!bots.has(msg4)){
      if(!msg3.includes('\n')){
        bots.set(msg4, {
          status: "pending-approval",
          owner: `${msg.member.id}`,
          id: `${msg4}`,
          name: `${msg1}`,
          prefix: `${msg2}`,
          description: `${msg3}`,
          certified: false,
          embedobj: null,
          monthly_votes: 0,
          alltime_votes: 0
        });
        waitingapproval.send('<@&473845526811377674>').then(m => m.delete());
        waitingapproval.send(embed).then(m => bots.update(msg4, m.id, "embedobj"));
        embed.setDescription(`[${member}]\n\nYour bot has been submitted.`)
        return m.edit(embed);
      }else{
        embed.setDescription(`[${member}]\n\nThe bots description **CANNOT** have a new line in it.`).setColor('RED');
        return m.edit(a1);
      }
    }else{
      embed.setDescription(`[${member}]\n\nThat bot has already been submitted.`).setColor('RED');
      return m.edit(a1);
    }
  }
  }
}

module.exports = SubmitCommand;