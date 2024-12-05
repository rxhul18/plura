# Plura API

The backend API service for Plura, built with Next.js, Hono, Prisma and Upstash.

## Check list

Before setting up the API, ensure you have:
- Node.js >= 18
- PNPM package manager below 19 not supported
- PostgreSQL database
- Redis instance (Upstash)

## Setup

1. Install dependencies:

```bash
pnpm install
```
2. Create a `.env` file in the `apps/api` directory with the following variables:

```bash
RESEND_API=
BASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
DATABASE_URL=
UPSTASH_REDIS_REST_TOKEN= 
UPSTASH_REDIS_REST_URL=
```

## License

Copyright 2024 Plura.