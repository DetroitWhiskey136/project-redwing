'use strict';

const { MessageEmbed } = require('discord.js');
const Event = require('@event/Event');
const { hasPlaceholder } = require('@utils/Utils');

class GuildMemberAddEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'guildMemberAdd',
      description: 'fires when member joins guild',
      enabled: true,
    });
  }

  async run(client, member) {
    let { displayName, displayHexColor, user, guild } = member;
    if (displayHexColor === '#000000') displayHexColor = '#00ffff';

    const settings = client.database.fn.settings.get(guild.id);
    const avatar = user.displayAvatarURL({ size: 128 });

    if (!settings.welcome.welcomeen) return;

    let welcomeMessage = settings.welcome.welcomemsg;

    welcomeMessage = hasPlaceholder(welcomeMessage, '{{user}}', displayName);
    welcomeMessage = hasPlaceholder(welcomeMessage, '{{guild}}', guild.name);

    var channel = member.guild.channels.find((c) => c.id === settings.welcome.welcomelog);
    if (!member.guild.me.permissionsIn(channel).has('SEND_MESSAGES')) return;
    if (guild.id === '432005276447670272' && !member.guild.roles.has(['481056982132850689'])) {
      await member.roles.add(['481056982132850689']).then(client.logger.log('Role Added to Member')).catch(console.error);
    }

    const embed = new MessageEmbed()
      .setTitle(`${user.username} has joined ${guild.name}`)
      .setColor(displayHexColor)
      .setDescription(`${welcomeMessage}`)
      .setThumbnail(avatar)
      .setTimestamp();

    channel.send(embed).catch((error) => this.client.logger.log(error, 'error'));
  }
}

module.exports = GuildMemberAddEvent;
