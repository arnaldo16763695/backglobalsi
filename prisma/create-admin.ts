import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcrypt';

// Crea un usuario ADMIN, o promueve a ADMIN/ACTIVE uno existente con ese email.
// Uso: ADMIN_EMAIL=... ADMIN_PASSWORD=... [ADMIN_NAME=...] [ADMIN_PHONE=...] pnpm db:create-admin

const { POSTGRES_PRISMA_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrador';
const ADMIN_PHONE = process.env.ADMIN_PHONE || '';

if (!POSTGRES_PRISMA_URL) {
  throw new Error('POSTGRES_PRISMA_URL no está definida');
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('Definir ADMIN_EMAIL y ADMIN_PASSWORD');
}
if (ADMIN_PASSWORD.length < 8) {
  throw new Error('ADMIN_PASSWORD debe tener al menos 8 caracteres');
}

const isSupabase = new URL(POSTGRES_PRISMA_URL).hostname.includes('supabase');
const pool = new Pool({
  connectionString: POSTGRES_PRISMA_URL,
  ...(isSupabase ? { ssl: { rejectUnauthorized: false } } : {}),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const email = ADMIN_EMAIL!.trim();
  const password = await hash(ADMIN_PASSWORD!, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { password, role: 'ADMIN', status: 'ACTIVE' },
    create: {
      email,
      name: ADMIN_NAME,
      phone: ADMIN_PHONE,
      password,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
    select: { id: true, email: true, role: true, status: true },
  });

  console.log('Usuario ADMIN listo:', admin);
}

main()
  .catch((error) => {
    console.error('No se pudo crear el ADMIN:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
