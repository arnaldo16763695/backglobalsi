# syntax=docker.io/docker/dockerfile:1

########## deps ##########
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
# Instala deps según tu lockfile (reproducible)
RUN npm ci

########## build ##########
FROM node:20-alpine AS builder
WORKDIR /app

# Trae node_modules resueltos
COPY --from=deps /app/node_modules ./node_modules

# Prisma primero para cache estable y generar el cliente
COPY prisma ./prisma
RUN npx prisma generate

# Copia el resto del código y compila Nest (src -> dist)
COPY . .
RUN npm run build

########## runtime ##########
FROM node:20-alpine AS runner
WORKDIR /app
# Dependencias nativas necesarias para Prisma en Alpine
RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=production
ENV PORT=4000

# === IMPORTANTE ===
# Trae node_modules al runtime (incluye @nestjs/core, etc.)
COPY --from=deps /app/node_modules ./node_modules

# Artefactos mínimos para ejecutar
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000

# Aplica migraciones y arranca Nest
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
