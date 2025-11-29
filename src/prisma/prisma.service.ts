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
import { parse as parseConnectionString } from 'pg-connection-string';

const connectionString = process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  throw new Error(
    'POSTGRES_PRISMA_URL no está definida en el entorno del backend',
  );
}

const parsed = parseConnectionString(connectionString);

const isSupabase =
  (parsed.host ?? '').includes('supabase') ||
  (parsed.host ?? '').includes('pooler.supabase');

const poolConfig: PoolConfig = {
  host: parsed.host,
  port: parsed.port ? Number(parsed.port) : 5432,
  user: parsed.user,
  password: parsed.password,
  database: parsed.database,
};

if (isSupabase) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

console.log('PRISMA POOL CONFIG =>', {
  host: poolConfig.host,
  port: poolConfig.port,
  database: poolConfig.database,
  ssl: poolConfig.ssl
    ? 'enabled (rejectUnauthorized=false)'
    : 'disabled',
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
