FROM node:20.12.0-alpine3.19

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /usr/home/plura

# Copy necessary files for dependencies and build
COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./turbo.json ./turbo.json
COPY ./tsconfig.json ./tsconfig.json

COPY apps ./apps
COPY packages ./packages

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build
# Expose ports 
EXPOSE 3000
# Start the application
CMD ["pnpm", "start"]
