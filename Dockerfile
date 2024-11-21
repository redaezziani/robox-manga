# Use the official Node.js image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight server for the runtime environment
FROM node:20-alpine AS runner

# Set environment variable to production for better performance
ENV NODE_ENV production
ENV PORT 3000
# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
