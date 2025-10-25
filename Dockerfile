# syntax=docker.io/docker/dockerfile:1

# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---------- build ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Prisma primero para cache estable y generate
COPY prisma ./prisma
RUN npx prisma generate

# Resto del código y build
COPY . .
RUN npm run build

# (opcional) aborta si dist no existe
RUN test -f dist/main.js || (echo "No existe dist/main.js"; ls -la dist; exit 1)

# ---------- runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
# Prisma runtime deps
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production

# usuario no root
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
USER nestjs

# artefactos mínimos
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000
# aplica migraciones y arranca (si manejas migraciones)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
