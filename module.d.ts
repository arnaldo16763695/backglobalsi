declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_PRISMA_URL: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_KEY: string;
  }
} 