FROM namesmt/images-alpine:node-aws-dev_pnpm10.0.0-alpha.0 AS base

RUN pnpm install -g turbo
WORKDIR /usr/home/plura/api
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

FROM base AS builder

WORKDIR /usr/home/plura/api
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile
COPY . .
ENV TURBO_REMOTE_CACHE=false
RUN turbo prune api --docker

FROM base AS installer

WORKDIR /usr/home/plura/api

COPY --from=builder /usr/home/plura/api/out/json/ .
RUN pnpm install --no-frozen-lockfile
COPY --from=builder /usr/home/plura/api/out/full/ .
RUN pnpm run build
RUN turbo build --filter=api...

FROM base AS runner

# RUN addgroup --system --gid 4444 honojs
# RUN adduser --system --uid 4444 skidgod

WORKDIR /usr/home/plura/api
RUN pnpm install --no-frozen-lockfile
# RUN chown -R skidgod:honojs /root/.local/share/pnpm

# USER skidgod

COPY --from=installer /usr/home/plura/api .

# Start the application
CMD ["pnpm", "start"]
