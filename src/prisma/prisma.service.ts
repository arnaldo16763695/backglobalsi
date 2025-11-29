// src/prisma/prisma.service.ts
import 'dotenv/config';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool, PoolConfig } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Usamos SIEMPRE la misma variable que en prisma.config.ts
const connectionString = process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  throw new Error(
    'POSTGRES_PRISMA_URL no está definida en el entorno del backend',
  );
}

// Config base del pool
const poolConfig: PoolConfig = {
  connectionString,
};

// Detectamos si es local o remoto (Supabase)
const isLocal =
  connectionString.includes('localhost') ||
  connectionString.includes('127.0.0.1');

// En producción (Supabase / Vercel):
// - activamos SSL
// - pero no rechazamos el certificado self-signed
if (!isLocal) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      adapter: new PrismaPg(pool),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await pool.end();
  }
}
