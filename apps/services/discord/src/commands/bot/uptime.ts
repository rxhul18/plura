import { Client, Message, EmbedBuilder, TextChannel } from 'discord.js';
import moment from 'moment';

export default {
  name: 'uptime',
  aliases: ['upt'],
  category: 'info',
  adminPermit: false,
  ownerPermit: false,
  run: async (
    client: Client & { emoji: { uptime: string } },
    message: Message,
    args: string[],
    prefix: string
  ) => {
    const uptimeDuration = moment.duration(client.uptime);
    const formattedUptime = uptimeDuration.humanize();
    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setDescription(`${client.emoji.uptime} | My uptime: \`${formattedUptime}\``);

    if (message.channel instanceof TextChannel) {
      await message.channel.send({ embeds: [embed] });
    }
  },
};
