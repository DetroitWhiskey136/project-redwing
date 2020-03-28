/* eslint-disable no-unused-vars, max-len, no-shadow */
'use strict';

const Command = require('@command/Command');

class SubmitCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'submit1',
      description: 'Submit your bot to get it added on the server.',
      category: 'Bots',
      usage: 'submit',
      guildOnly: true,
      permLevel: 'user',
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) { // eslint-disable-line no-unused-vars
    let msg1, msg2, msg3, msg4;
    const bots = database.bots;
    let embed = new messageEmbed();


    const guildSettings = database.fn.settings.get(guild.id);
    if (!guildSettings.bots.verifyguild || !guildSettings.bots.verifychannel) {
      embed.setDescription('Error: your servers\' admins have not setup the guild or channel for bot verifications, please ask them to do so before proceeding.').setColor('RED');
      return channel.send(embed);
    }


    const welcomeString = `Welcome to the Redwing Bots Submission Form! \n\n You may cancel this form at any time by typing \`cancel\` \n\n`;

    const GuildMember = await guild.members.fetch(author.id);

    const filter = (m) => m.author.id === GuildMember.user.ID;

    embed
      .setTitle(`Redwing Bot Submission`)
      .setColor(`GREEN`)
      .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
      .setDescription(`${welcomeString} \`What is your bots name?\``);

    let stage = 0;
    message.channel.send(embed).then((m) => {
      startQuery(m, stage);
    }).catch((error) => client.logger.error(error));

    function startQuery(m, stage) {
      const filter = (msg) => msg.author.id === message.author.id;
      message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then((collected) => {
        if (collected.first().content === 'cancel') {
          embed.setDescription(`[${member}]\n\nThe bot submission has been cancelled!`);
          embed.setColor(`#FFFF00	`);
          return m.edit(embed);
        } else {
          steps(stage, collected, m);
        }
      })
        .catch((err) => {
          console.log(err);
          embed.setDescription(`:clock1: ${member}, hello? Cancelled`).setColor('RED');
          m.edit(embed);
        });
    }

    function steps(step, collected, m) {
      stage++;
      switch (step) {
        // Name
        case 0:
          msg1 = collected.first().content;
          collected.first().delete();
          embed.setDescription(`[${member}]\n\n\`What is your bots' prefix?\``);
          m.edit(embed);
          return startQuery(m, stage);
        // Prefix
        case 1:
          msg2 = collected.first().content;
          collected.first().delete();
          embed.setDescription(`[${member}]\n\n\`What is your bots' description?\`\n__NOTE: the description cannot have a new line!!__`);
          m.edit(embed);
          return startQuery(m, stage);
        // Description
        case 2:
          msg3 = collected.first().content;
          collected.first().delete();
          embed.setDescription(`[${member}]\n\n\`What is your bots ID?\``);
          m.edit(embed);
          return startQuery(m, stage);
        // ID
        case 3:
          msg4 = collected.first().content;
          collected.first().delete();
          client.users.fetch(msg4).then((a) => {
            if (a.bot) { // If the userID returned is indeed a bot!
              if (bots.has(msg4)) { // Perform before checks if the bot data is already existent in the database.
                embed.setDescription(`[${member}]\n\nThat bot has already been submitted.`).setColor('RED');
                return m.edit(embed);
              }
              embed.setDescription(`[${member}] \n\n Your bot **${msg1}** has been submitted and is now awaiting for verification.`);
              return m.edit(embed).then(() => processBotInfo(m)).catch((error) => client.logger.error(error)); // Edits the embedded message from the original command location.
            } else {
              embed.setDescription(`[${member}]\n\nThe id provided is not a bot id, please try again.`).setColor('RED');
              return m.edit(embed);
            }
          }).catch((error) => {
            embed.setDescription(`[${member}]\n\nThat user does not exist, please re-submit.`).setColor('RED');
            console.log(error);
            return m.edit(embed);
          });
          break;
      }
    }

    function processBotInfo(message) {
      // Pre-declared variables.
      const serverVerify = client.guilds.cache.get(guildSettings.bots.verifyguild);
      const channelQueue = serverVerify.channels.cache.get(guildSettings.bots.verifychannel);

      // Construct the Verify Embed.
      const embed2 = new messageEmbed();
      embed2
        .setTitle(`New bot submitted!`)
        .setColor(`#e67e22`)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=${msg4}&scope=bot&permissions=0`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/371149983279480832/512055211528028172/new_bot.png`)
        .setTimestamp()
        .addField('Author', `${author}`, true)
        .addField('Name', `${msg1}`, true)
        .addField('Prefix', `${msg2}`, true)
        .addField('Bot ID', `${msg4}`, true)
        .addField('Description', `${msg3}`, true)
        .addField('Invite Link', `[Invite the bot here!](https://discordapp.com/oauth2/authorize?client_id=${msg4}&scope=bot&permissions=0)`, true)
        .setFooter(`Submitted by: ${member.user.username} (${member.id})`);

      // Enmap Related Code
      const forBotObject = {
        name: `${msg1}`,
        description: `${msg3}`,
        prefix: `${msg2}`,
        id: `${msg4}`,
        status: `pending-approval`,
        owner: `${author.id}`,
        certified: false,
        monthly_votes: 0,
        alltime_votes: 0,
        embedobj: null,
      };

      database.fn.bots.set(msg4, forBotObject);
      channelQueue.send(embed2).catch((error) => client.logger.error(error));
    }
  }
}
module.exports = SubmitCommand;
