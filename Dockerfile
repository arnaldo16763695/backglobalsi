# Etapa 1: Build
FROM node:18.18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala dependencias necesarias para compilar módulos nativos (prisma y otros)
RUN apk add --no-cache build-base python3

# Instala node-gyp globalmente (requerido para compilación)
RUN npm install -g node-gyp

# Copia los archivos de dependencias para instalar los packages
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Genera el cliente Prisma
RUN npx prisma generate

# Compila el proyecto NestJS
RUN npm run build

# Etapa 2: Producción
FROM node:18.18-alpine

WORKDIR /usr/src/app

# Copia node_modules y código compilado desde la etapa build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Variable de entorno útil para Prisma en algunos entornos
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Expone el puerto por defecto de NestJS
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["node", "dist/main"]
