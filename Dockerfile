# syntax=docker.io/docker/dockerfile:1

########################
# deps
########################
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
# Incluye devDependencies para tener 'prisma' CLI disponible
RUN npm ci --include=dev

########################
# builder
########################
FROM node:20-alpine AS builder
WORKDIR /app
# Trae node_modules resueltos
COPY --from=deps /app/node_modules ./node_modules
# Copia el código y compila Nest (src -> dist)
COPY . .
RUN npm run build

########################
# runner
########################
FROM node:20-alpine AS runner
WORKDIR /app
# Dependencias nativas necesarias para Prisma en Alpine
RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=production
ENV PORT=4000

# Trae node_modules (incluye @prisma/client y prisma CLI)
COPY --from=deps /app/node_modules ./node_modules

# Artefactos mínimos
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000

# 1) Genera el cliente (garantiza node_modules/.prisma/client)
# 2) Aplica migraciones
# 3) Arranca Nest
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/main.js"]
