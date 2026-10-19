import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const REQUIRED_ENV = ['JWT_SECRET_KEY', 'JWT_REFRESH_TOKEN_KEY'];

async function bootstrap() {
  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length > 0) {
    throw new Error(
      `Faltan variables de entorno requeridas: ${missingEnv.join(', ')}`,
    );
  }

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.CORS_ORIGIN) {
    app.enableCors({
      origin: process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
      credentials: true,
    });
  }

  const config = new DocumentBuilder()
    .setTitle('GlobalSI API')
    .setDescription('API de gestión de clientes, empresas y órdenes de trabajo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error('No se pudo iniciar la aplicación:', error);
  process.exit(1);
});
