import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('12345678', 10)

  // 🔁 Usuario ADMIN
  const adminEmail = 'admin@globalsi.cl'
  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } })

  const admin = adminExists
    ? adminExists
    : await prisma.user.create({
        data: {
          name: 'Admin User',
          email: adminEmail,
          phone: '04140000000',
          password,
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      })

  // 👤 Cliente
  const clientRut = '12345678-9'
  const clientExists = await prisma.clients.findUnique({ where: { rut: clientRut } })

  const client = clientExists
    ? clientExists
    : await prisma.clients.create({
        data: {
          name: 'Juan Pérez',
          email: 'juan@cliente.com',
          phone: '04120000000',
          rut: clientRut,
        },
      })

  // 🏢 Empresa
  const companyRut = 'J-12345678-0'
  const companyExists = await prisma.company.findUnique({ where: { rut: companyRut } })

  const company = companyExists
    ? companyExists
    : await prisma.company.create({
        data: {
          rut: companyRut,
          companyName: 'Mi Empresa C.A.',
          email: 'empresa@correo.com',
          phone: '02120000000',
          location: 'Caracas',
          observations: 'Empresa de prueba',
          clientsId: client.id,
        },
      })

  console.log('✅ Registros creados o recuperados:')
  console.log({ admin, client, company })
}

main()
  .then(async () => {
    console.log('✅ Seed ejecutado con éxito.')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
