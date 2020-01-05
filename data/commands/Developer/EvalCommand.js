/* eslint-disable max-len, max-depth, no-unused-vars */
'use strict';
const token = process.env.TOKEN;
const { code } = require('@utils/Utils');
const Command = require('@command/Command');
const { inspect } = require('util');
const value = (str) => code(str, 'js').replace(token, () => '*'.repeat(token.length));

class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Evaluates arbituabry JavaScript',
      category: 'Developer',
      usage: 'eval <code>',
      aliases: ['compile', 'ev', 'js'],
      permLevel: 'botadmin',
      guildOnly: true,
    });
  }

  async run({ totalLength, message, mentions, member, guild, author, channel, client, voiceChannel, level, prefix, database, query, args, discord, messageEmbed, sendMessage }) {
    const embed = new messageEmbed();
    const text = query.replace(/^```(js|javascript ?\n)?|```$/gi, '');

    try {
      let tt = text.split('\n');
      tt[tt.length - 1] = `return ${tt[tt.length - 1]}`;
      const fixedText = tt.join('\n');
      const evaluated = await Promise.resolve(eval(text));
      const inspected = inspect(evaluated, { depth: 0, showHidden: true });
      embed
        .setDescription(value(inspected))
        .setColor('GREEN');

      if (!inspected || !evaluated) embed.setColor('RED');
    } catch (error) {
      embed
        .setDescription(value(error));
    } finally {
      channel.send(embed);
    }

    /* const client = this.client;
    const tag = message.author.username;

    const embed = new this.client.discord.MessageEmbed()
      .setColor(message.member.displayColor);

    const blocked_input = [
      'eval',
      'destroy',
      'token',
    ];

    const blocked_output = [
      client.id,
      client.token,
    ];

    let script = args.join(' ');

    const del = !!script.toString().startsWith('-');
    if (del) {
      message.delete();
      script = script.substr(1);
    }

    const mute = !!script.toString().startsWith('*');
    if (mute) {
      script = script.substr(1);
    }

    function checkInput(input) {
      return blocked_input.find((block) => String(input).includes(block));
    }

    function checkOutput(output) {
      return blocked_output.find((block) => String(output).includes(block));
    }

    function send(msg) {
      if (msg && msg.length >= 1999) {
        embed.setDescription('This result is to long to display in chat!');
        message.channel.send(embed);
      } else if (!mute) {
        embed.setDescription(`${msg} \n`);
        message.channel.send(embed);
      }
    }

    client.logger.debug(`Input pass: ${script}`);

    if (checkInput(script)) {
      send('Evaluation Blocked');
      client.logger.unauthorized(`${tag}'s script was blocked for attempting to run: [${script}]`);
    } else {
      try {
        client.logger.debug(`Compile used by ${tag}'s Script:`);
        let evaluated;
        try {
          evaluated = eval(script);
        } catch (error) {
          send(`**Error Result:** \n\n${error}`);
          client.logger.error(`[${script}] Returned Error: `);
          console.log(error);
          evaluated = false;
        }

        if (evaluated) {
          if (evaluated.then) {
            evaluated.then((out) => {
              if (checkOutput(out)) {
                send('Promise Result Blocked!');
                client.logger.unauthorized(`${tag}'s promise result was blocked for trying to run [${script}], with the results of [${out}]`);
              } else {
                send(`**Promise Result:** \n\n${out}`);
                client.logger.debug(`[${script}] Promise Result Returned`, 'debug');
              }
              client.logger(`${evaluated}`);
            }).catch((error) => {
              if (checkOutput(error.message)) {
                send('Promise Error Result Blocked!');
                client.logger.unauthorized(`${tag}'s promise error result was blocked for trying to run [${script}], with the error message of [${error.message}]`);
              } else {
                send(`**Promise Error Result:** \n\n${error.message}`);
                client.logger.error(`[${script}] Promise Error Result Returned:`);
                client.logger.error(error);
              }
            });
          } else {
            if (checkOutput(evaluated.toString())) {
              send('Reslut Blocked');
              client.logger.unauthorized(`${tag} was blocked for trying to run [${script}], with the results of [${evaluated}]`);
            } else {
              send(`**Standard Result:** \n\n ${JSON.stringify(evaluated)}`);
              client.logger.debug(`[${script}] Returned: ${evaluated}`);
            }
            client.logger.debug(evaluated);
          }
        }
      } catch (error) {
        send(`Eval Command Error: \n\`${error}\``);
        client.logger.error('Eval Command Error: ');
        client.logger.error(`${error}\n\n${error.stack}`);
      }
    } */
  }
}

module.exports = EvalCommand;
