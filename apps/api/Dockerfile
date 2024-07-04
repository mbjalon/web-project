# Base image for all stages
FROM node:18-alpine AS base

# Builder stage
FROM base AS builder
WORKDIR /app
# Install turbo globally
RUN npm install -g turbo
COPY . .
# Prune dependencies for the API
RUN turbo prune --scope=api --docker

# Installer stage
FROM base AS installer
WORKDIR /app
# Copy necessary files for installing dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
# Install dependencies
RUN npm install
# Copy schema.prisma into the container
COPY --from=builder /app/apps/api/prisma ./prisma
# Generate Prisma client
RUN npx prisma generate

# Build stage
FROM base AS build
WORKDIR /app
# Copy full pruned files for building
COPY --from=builder /app/out/full/ .
# Install dependencies again to make sure all necessary packages are there
COPY --from=installer /app/node_modules ./node_modules
# Build the API
RUN npm run build -w apps/api

# Production stage
FROM base AS production
WORKDIR /app
# Set permissions for the /app directory
RUN chown -R node:node /app
USER node
# Copy built files
COPY --from=build --chown=node /app/apps/api/dist ./dist
COPY --from=build --chown=node /app/apps/api/package.json ./
COPY --from=installer --chown=node /app/package-lock.json ./
COPY --from=installer --chown=node /app/prisma ./prisma
COPY --from=installer --chown=node /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Install production dependencies
RUN npm ci --omit=dev
# Expose necessary port
EXPOSE 3000
# Run the migration script and start the backend application
CMD ["sh", "-c", "npm run migrate && npm run db:seed && node dist/index.js"]
