import { WebhookClient } from "discord.js";
import { config } from "./config";

export const log_error = new WebhookClient({
  url: config.WEBHOOK_ERROR_LOGGING,
});
export const log_guild = new WebhookClient({
  url: config.WEBHOOK_GUILD_LOGGING,
});
