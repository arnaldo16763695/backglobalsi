# syntax=docker.io/docker/dockerfile:1

########## deps ##########
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
# ❗ instala también devDeps para tener 'prisma' CLI disponible
RUN npm ci --include=dev

########## build ##########
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Compila Nest (src -> dist)
RUN npm run build

########## runtime ##########
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production
ENV PORT=4000

# Trae node_modules (incluye @prisma/client y prisma CLI)
COPY --from=deps /app/node_modules ./node_modules

# Artefactos necesarios
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 4000

# 1) Genera el cliente en runtime (garantiza que exista para esta imagen)
# 2) Aplica migraciones
# 3) Arranca Nest
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/main.js"]
