# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Las instrucciones base del proyecto (comandos, variables de entorno, reglas de seguridad, convenciones y deuda pendiente) están en AGENTS.md y aplican íntegramente:

@AGENTS.md

Lo siguiente complementa AGENTS.md con detalles que requieren leer varios archivos. El README.md es la plantilla genérica de NestJS y no aporta información del proyecto (su `test:e2e` no existe en `package.json`).

## Arranque y entorno

- `src/main.ts` falla al iniciar si faltan `JWT_SECRET_KEY` o `JWT_REFRESH_TOKEN_KEY`. `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y `transform`: cualquier campo no declarado en el DTO provoca 400, así que todo campo nuevo debe declararse con decoradores de `class-validator`.
- CORS solo se habilita si existe `CORS_ORIGIN` (lista separada por comas).
- `src/prisma/prisma.service.ts` lee `POSTGRES_PRISMA_URL` **al importar el módulo** y lanza si no está definida. Prisma 7 usa el driver adapter `@prisma/adapter-pg` con un `pg.Pool` propio; si el host contiene `supabase` activa SSL con `rejectUnauthorized: false`.
- `prisma.config.ts` define schema, carpeta de migraciones y datasource (Prisma 7 no lo lee desde el schema).
- Los tests cargan `test/setup-env.ts` (vía `jest.setupFiles`), que rellena variables de entorno falsas para que la importación de `PrismaService` no falle. Los specs no se conectan a la base de datos.

## Rutas de importación

- Se usa `src/...` como import absoluto (resuelto por `baseUrl` en tsconfig y `moduleNameMapper` en Jest). También existe el alias `@/` (`_moduleAliases` + Jest). Seguir el estilo del archivo que se edite.

## Autenticación y roles

- Guards en `src/auth/guard/`; decorador `@Roles` en `src/decorators/roles.decorator.ts`. `RolesGuard` permite el acceso si el handler no declara roles, por lo que un endpoint sin `@Roles` solo queda protegido por `JwtGuard`.
- Payload del JWT: `sub` = id del usuario, más `role`. `AuthService` firma con `JwtService` pasando el secreto en cada llamada (el módulo JWT no se configura globalmente).

## Reportes PDF

- `ReportsService` consulta datos con Prisma y construye un `TDocumentDefinitions` de pdfmake mediante funciones puras en `src/reports/documents/*.report.ts` (estilos compartidos en `formats.ts`); `PrinterService` lo convierte en documento PDFKit que el controlador envía como stream.
- Fuentes y logo viven en `src/assets/` y se copian a `dist/assets/` por `nest-cli.json` (`assets`). `resolveFontsPath`/`resolveLogoPath` (`src/utils/helpers.ts`) buscan primero en `dist/` y luego en `src/` relativo a `process.cwd()`: el proceso debe arrancar desde la raíz del repo.

## Dominio

- Modelos principales (`prisma/schema.prisma`): `User` (roles ADMIN/TECHNICIAN/USER/CLIENT), `Clients`, `Company`, `Works` (órdenes de trabajo), `WorkTechnician` (asignación técnico↔trabajo), `StepsToWork` (pasos ordenados con `StatusSteps`), `ImagesWorks`/`ImagesStepToWork` y `AuditLog`.
- El soft-delete se modela con el enum `Status` (`ACTIVE`/`INACTIVE`/`DELETED`) en lugar de un campo `deletedAt`. El avance de un trabajo usa `StatusProgress` (`NOT_STARTED`/`IN_PROGRESS`/`FINISHED`).
- Fechas de negocio usan la zona `America/Santiago`: `getChileParts` y `getChileStartOfTodayUTC` en `src/utils/helpers.ts`. El código de orden (`src/utils/generate-work-code.ts`) tiene formato `YYMMDD` + secuencia de 3 dígitos.

## Despliegue

- Las migraciones se aplican al arrancar: el `CMD` del Dockerfile (Node 22 alpine, `npm ci`) y el script `start` (usado por Nixpacks, con pnpm vía Corepack) ejecutan `prisma migrate deploy` antes de `node dist/src/main.js`. `start:prod` arranca sin migrar. `postinstall` ejecuta `prisma generate`.
