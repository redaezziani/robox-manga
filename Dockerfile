# First stage: dependencies
FROM node:20-alpine AS base

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Second stage: build the project
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_LINT_DURING_BUILD=false

# Run the Next.js build
RUN npm run build

# Third stage: production image
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy the build files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Run the production server
CMD ["node", "server.js"]
