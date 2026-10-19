import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const databaseUrl = process.env.POSTGRES_PRISMA_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  ...(databaseUrl ? { datasource: { url: databaseUrl } } : {}),
});
