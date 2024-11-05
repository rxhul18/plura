FROM node:20.12.0-alpine3.19

WORKDIR /usr/home/plura

COPY package.json package-lock.json turbo.json tsconfig.json ./

RUN pnpm install

RUN pnpm run build

EXPOSE 3001

CMD ["pnpm", "start"]