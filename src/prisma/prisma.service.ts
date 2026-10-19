// src/prisma/prisma.service.ts
import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool, PoolConfig } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  throw new Error(
    'POSTGRES_PRISMA_URL no está definida en el entorno del backend',
  );
}

const databaseUrl = new URL(connectionString);

const isSupabase =
  databaseUrl.hostname.includes('supabase') ||
  databaseUrl.hostname.includes('pooler.supabase');

const poolConfig: PoolConfig = {
  host: databaseUrl.hostname,
  port: databaseUrl.port ? Number(databaseUrl.port) : 5432,
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: decodeURIComponent(databaseUrl.pathname.replace(/^\//, '')),
};

if (isSupabase) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

// console.log('PRISMA POOL CONFIG =>', {
//   host: poolConfig.host,
//   port: poolConfig.port,
//   database: poolConfig.database,
//   ssl: poolConfig.ssl
//     ? 'enabled (rejectUnauthorized=false)'
//     : 'disabled',
// });

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
