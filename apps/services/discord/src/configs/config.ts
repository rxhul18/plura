import dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  WEBHOOK_ERROR_LOGGING,
  WEBHOOK_GUILD_LOGGING,
} = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing bot envs!");
}

if (!WEBHOOK_ERROR_LOGGING || !WEBHOOK_GUILD_LOGGING) {
  throw new Error("Missing logging webhooks envs!");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  WEBHOOK_ERROR_LOGGING,
  WEBHOOK_GUILD_LOGGING,
};
