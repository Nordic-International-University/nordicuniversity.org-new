# Dockerfile
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache libc6-compat python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy all files
COPY . .

# Copy .env file
COPY .env .env

# Build application
RUN npm run build

# Expose port
EXPOSE 3778

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3778

# Start application
CMD ["npm", "start"]