import { PrismaClient, User } from '@prisma/client'
import authService from 'src/service/auth.service'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL as string },
    update: {},
    create: {
      nazev_firmy: 'David Flek',
      role: 'Admin',
      ico: 'test ico',
      dic: 'test dic',
      tel: '123 456 789',
      email: process.env.ADMIN_EMAIL as User['email'],
      password: authService.hashPassword(process.env.ADMIN_PASSWORD as User['password']),
      address: {
        create: {
          mesto: 'Brno',
          ulice: 'Gajdošova',
          cislo_popis: '50',
          cislo_orient: '80',
          psc: '602 00',
        },
      }
    }
  })
}

main()
  .catch(e => {
    throw e
  })