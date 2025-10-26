# Etapa 1: Build
FROM node:18.18-alpine AS builder

WORKDIR /usr/src/app

# Dependencias para compilar módulos nativos (bcrypt, prisma engines, etc.)
RUN apk add --no-cache build-base python3

# (opcional) node-gyp, si tu proyecto realmente lo requiere
RUN npm install -g node-gyp

# Instala deps
COPY package*.json ./
RUN npm install

# Copia el resto
COPY . .

# Genera Prisma Client (build-time)
RUN npx prisma generate

# Compila Nest
RUN npm run build

# Etapa 2: Producción
FROM node:18.18-alpine

WORKDIR /usr/src/app

# Libs necesarias para Prisma en Alpine (runtime)
RUN apk add --no-cache libc6-compat openssl

# Copia artefactos
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package.json ./

# Prisma tip
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
# Tu app escucha en 4000
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Al iniciar el contenedor:
# 1) aplica migraciones (usa DATABASE_URL de Dokploy)
# 2) arranca Nest
RUN ls -la /usr/src/app && ls -la /usr/src/app/dist || true
CMD ["sh","-c","npx prisma migrate deploy && node dist/main"]
