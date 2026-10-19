process.env.POSTGRES_PRISMA_URL ||=
  'postgresql://user:password@localhost:5432/backglobalsi_test';
process.env.JWT_SECRET_KEY ||= 'test-secret';
process.env.JWT_REFRESH_TOKEN_KEY ||= 'test-refresh-secret';
