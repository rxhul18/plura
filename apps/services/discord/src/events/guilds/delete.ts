import { Client, EmbedBuilder, Guild } from "discord.js";
import { ColorResolvable } from "discord.js";
import { log_error } from "../../configs/loggers";

export default async function handleBotLeave(
  client: Client & {
    config: { owner: string[] };
    default_color: ColorResolvable;
  },
): Promise<void> {
  client.on("guildDelete", async (guild: Guild) => {
    try {
      console.log(`Bot was removed from the guild: ${guild.name}`);
    } catch (error) {
      console.error(`Error handling guildDelete event:`, error);
      log_error.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.default_color)
            .setDescription(`\`\`\`ts\n${error}\`\`\``),
        ],
      });
    }
  });
}
