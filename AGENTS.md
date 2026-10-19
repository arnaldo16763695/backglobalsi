# AGENTS.md

Backend NestJS + Prisma + PostgreSQL para gestión de clientes, empresas, órdenes de trabajo, técnicos y reportes PDF.

## Comandos

```bash
pnpm install                 # instalar dependencias
pnpm db:generate             # generar Prisma Client
pnpm exec prisma migrate dev --name <nombre>  # nueva migración (desarrollo)
pnpm exec prisma db push     # solo para desarrollo sin migraciones
pnpm start:dev               # servidor en modo watch
pnpm build                   # compila a dist/src/main.js
pnpm start                   # ejecutar build (node dist/src/main.js)
pnpm lint                    # ESLint + Prettier (aplica --fix)
pnpm test -- --runInBand     # tests
pnpm test -- src/users/users.service.spec.ts --runInBand  # un solo test
npx tsc --noEmit -p tsconfig.build.json  # typecheck sin tests ni specs
```

Notas:
- El paquete activo para desarrollo es **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).
- Versión fijada en `packageManager: pnpm@10.34.7` (por Corepack 0.24.1 de Nixpacks). Activarla con `corepack enable` o `npm i -g pnpm@10.34.7`.
- Docker usa **npm ci** con `package-lock.json`. Mantener ambos lockfiles sincronizados hasta unificar el gestor.
- La salida de build es `dist/src/main.js`.

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```env
POSTGRES_PRISMA_URL=postgresql://usuario:password@host:5432/base
JWT_SECRET_KEY=<secreto-aleatorio>
JWT_REFRESH_TOKEN_KEY=<otro-secreto-aleatorio>
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

- Nunca commitear `.env` ni secretos reales.
- Generar secretos con: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
- `JWT_SECRET_KEY` firma access tokens (1h) y `JWT_REFRESH_TOKEN_KEY` refresh tokens (7d).

## Arquitectura

- `PrismaModule` es `@Global`: hay un único `PrismaService` y un solo pool de conexiones.
- `AuthModule` es `@Global`: exporta `JwtService`, `JwtGuard`, `RefreshJwtGuard` y `RolesGuard`.
- Usar `@UseGuards(JwtGuard, RolesGuard)` y `@Roles('ADMIN' | 'TECHNICIAN' | 'USER' | 'CLIENT')`.
- El prefijo global es `/api`. Swagger está en `/api/docs`.
- El build incluye `prisma/seed.ts` y `prisma.config.ts`, por eso la entrada es `dist/src/main.js`.

## Reglas de seguridad

- Nunca devolver el campo `password`. Usar `USER_SAFE_SELECT` para cualquier consulta que incluya usuarios.
- Hashear contraseñas con bcrypt (coste 10) en creación, actualización y cambio de contraseña.
- El registro público (`POST /auth/register`) siempre crea `USER`/`ACTIVE`; ignorar rol o estado enviados por el cliente.
- Los endpoints de perfil usan el `sub` del JWT (`req.user.sub`), nunca un ID recibido por URL o body.
- `UpdateProfileDto` no permite cambiar rol, estado ni contraseña.
- `POST/PATCH/DELETE` sensibles requieren roles explícitos. Reportes y auditorías son solo `ADMIN`.
- Validar DTOs con `class-validator`. Aplicar `@Sanitize()` a texto libre, nunca a contraseñas.
- No exponer detalles internos en errores. Lanzar `HttpException`/`NotFoundException`/`ConflictException`.

## Convenciones de código

- No silenciar errores con `console.log` ni devolver `undefined` o `{ error }`; lanzar excepciones HTTP.
- Usar `prisma.$transaction` para escrituras múltiples.
- Cualquier cambio en `prisma/schema.prisma` requiere migración y regeneración del cliente.
- Agregar índices a claves foráneas y campos de filtro; evaluar `onDelete`/`onUpdate` al crear relaciones.
- Mantener `pnpm lint`, typecheck, build y tests en verde antes de terminar.

## Estado pendiente (fase de lógica/modelo)

- `WorksService.create`: el código de trabajo usa `count + 1`; tiene condición de carrera y colisiones tras borrados.
- `StepstoworksService.reorderSteps` ignora el `workId` y no valida pertenencia de los pasos.
- `editStepToWork` no actualiza la descripción aunque el DTO lo permita.
- Varios servicios aún silencian errores y devuelven respuestas inconsistentes.
- `WorksService.remove` hace borrado físico pese al patrón de soft-delete.
- Revisar DTOs inconsistentes, índices, cascadas y nomenclatura del schema.
- Los tests actuales son smoke tests de definición; faltan pruebas reales de lógica y e2e.
