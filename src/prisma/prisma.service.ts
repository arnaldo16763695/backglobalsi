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

// Detectamos si la URL parece de Supabase (remota)
const isSupabase =
  connectionString.includes('supabase.co') ||
  connectionString.includes('supabase.com') ||
  connectionString.includes('pooler.supabase');

// Config base del pool
const poolConfig: PoolConfig = {
  connectionString,
};

// ✅ Si es Supabase (tanto en local como en Vercel) → usamos SSL pero
//    desactivamos la validación estricta del certificado (self-signed).
if (isSupabase) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

// 👀 Log para verificar qué está usando realmente
console.log('PRISMA POOL CONFIG =>', {
  connectionString,
  ssl: poolConfig.ssl ? 'enabled (rejectUnauthorized=false)' : 'disabled',
});

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
