import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db";
import { multiSession } from "better-auth/plugins";

export const config = {
  trustedOrigins: ["http://localhost:3003"],
  baseURL: "http://localhost:3001",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [multiSession()],
  emailAndPassword: {
    enabled: true,
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);

export type Session = typeof auth.$Infer.Session;
