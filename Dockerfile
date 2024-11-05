FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app


COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./turbo.json ./turbo.json
COPY ./tsconfig.json ./tsconfig.json

COPY apps ./apps
COPY packages ./packages

RUN npm install

RUN npm run build

CMD ["npm", "start"]