# Stage 1: Dependencies + Build tools
FROM node:20-alpine AS deps

# Install build dependencies (temporary)
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --legacy-peer-deps

# Stage 2: Builder
FROM node:20-alpine AS builder

# Only runtime dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source
COPY . .

# Build
RUN npm run build

# Stage 3: Runner (PRODUCTION)
FROM node:20-alpine AS runner

# Only runtime dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3778

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only production files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/i18n.ts ./i18n.ts
COPY --from=builder --chown=nextjs:nodejs /app/locales ./locales
COPY --from=builder --chown=nextjs:nodejs /app/middleware.ts ./middleware.ts

USER nextjs

EXPOSE 3778

CMD ["npm", "start"]