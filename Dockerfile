# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# ---------- deps ----------
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder ----------
FROM base AS builder
WORKDIR /app

# node_modules del stage deps
COPY --from=deps /app/node_modules ./node_modules

# copia Prisma primero para cache estable y genera cliente
COPY prisma ./prisma
RUN npx prisma generate

# copia el resto del código y compila Nest
COPY . .
RUN npm run build

# ---------- runner ----------
FROM base AS runner
WORKDIR /app

# Prisma en alpine requiere estas libs en runtime
RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=production

# trae artefactos necesarios
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000

# Ejecuta migraciones antes de arrancar Nest
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
