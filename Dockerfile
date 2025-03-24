# Base image
FROM node:20-alpine AS base

# Set the working directory
WORKDIR /app

# Install dependencies only when necessary
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Next.js collects anonymous telemetry data about general usage
ENV NEXT_TELEMETRY_DISABLED 1

# Skip ESLint during build
ENV NEXT_LINT_DURING_BUILD=false

# Skip TypeScript checks during build
ENV TS_CHECK=false

# Run the build
RUN npm run build

# Production image, copy only necessary files
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
