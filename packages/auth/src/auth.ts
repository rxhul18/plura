import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db";
import { multiSession } from "better-auth/plugins";
const BaseDomain =
  process.env.NODE_ENV === "production"
    ? process.env.API_DOMAIN as string
    : "http://localhost:3001";
  const AppDomain =
   process.env.NODE_ENV === "production"
    ? process.env.APP_DOMAIN as string
    : "http://localhost:3003";

export const config = {
  trustedOrigins: [AppDomain],
  baseURL: BaseDomain,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [multiSession()],
  emailAndPassword: {
    enabled: true,
  },
  ...(process.env.NODE_ENV === "production" && {
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
      },
    },
  }),
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);

export type Session = typeof auth.$Infer.Session;
