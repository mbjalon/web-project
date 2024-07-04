# Base image for all stages
FROM node:18-alpine AS base

# Builder stage
FROM base AS builder
WORKDIR /app
# Install turbo globally
RUN npm install -g turbo
COPY . .
# Prune dependencies for the web
RUN turbo prune --scope=web --docker

# Installer stage
FROM base AS installer
WORKDIR /app
# Copy necessary files for installing dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
# Install dependencies
RUN npm install

# Build stage
FROM base AS build
WORKDIR /app
# Copy full pruned files for building
COPY --from=builder /app/out/full/ .
# Install dependencies again to make sure all necessary packages are there
COPY --from=installer /app/node_modules ./node_modules
# Build the web
RUN npm run build -w apps/web

# Production stage
FROM nginx:latest AS production
# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# Create logs directory
RUN mkdir -p /app/logs
# Copy built web files
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
# Copy local packages
COPY --from=builder /app/packages ./packages
# Copy custom nginx configuration
COPY apps/web/nginx.conf /etc/nginx/nginx.conf
# Expose default ports
EXPOSE 80 443
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
