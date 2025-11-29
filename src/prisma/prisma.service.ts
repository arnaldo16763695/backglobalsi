import 'dotenv/config';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 👇 USAMOS LA MISMA ENV QUE ARRIBA
const connectionString = process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  // Si llegas a ver este error, entonces el problema es que la env
  // no se está cargando en el backend.
  throw new Error('POSTGRES_PRISMA_URL no está definida en el entorno del backend');
}

const pool = new Pool({
  connectionString,
});

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
