import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create mock data for the Address and Contact models
  const user1 = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL as User['email'] },
    update: {},
    create: {
      nazev_firmy: 'Reflek plus',
      ico: '123456789',
      dic: 'CZ012518',
      tel: '123 456 789',
      email: process.env.ADMIN_EMAIL as User['email'],
      password: process.env.ADMIN_PASSWORD as User['password'],
      address: {
        create: {
          mesto: 'Brno',
          ulice: 'Gajdošova',
          cislo_popis: '50',
          cislo_orient: '80',
          psc: '602 00',
        },
      },
      branch: {
        create: [
          {
            tel: '123456789',
            email: 'branch@example.com',
            address: {
              create: {
                mesto: 'Brno',
                ulice: 'Gajdošova',
                cislo_popis: '50',
                cislo_orient: '80',
                psc: '602 00',
              },
            },
          },
          {
            tel: '111111111',
            email: 'branch2@gmail.com',
            address: {
              create: {
                mesto: 'Praha',
                ulice: 'Brněnská',
                cislo_popis: '7',
                cislo_orient: '520',
                psc: '666 99',
              }
            }
          }
        ]
      }
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      nazev_firmy: 'Company XYZ',
      ico: '987654321',
      dic: 'CZ056789',
      tel: '987 654 321',
      email: 'user2@example.com',
      password: 'password2',
      address: {
        create: {
          mesto: 'Ostrava',
          ulice: 'Dlouhá',
          cislo_popis: '1',
          cislo_orient: '',
          psc: '700 30',
        },
      },
      branch: {
        create: [
          {
            tel: '111111111',
            email: 'branch2@example.com',
            address: {
              create: {
                mesto: 'Ostrava',
                ulice: 'Dlouhá',
                cislo_popis: '1',
                cislo_orient: '',
                psc: '700 30',
              },
            },
          },
          {
            tel: '222222222',
            email: 'branch3@example.com',
            address: {
              create: {
                mesto: 'Plzeň',
                ulice: 'Náměstí Republiky',
                cislo_popis: '5',
                cislo_orient: '',
                psc: '301 00',
              }
            }
          }
        ]
      }
    }
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'user3@example.com' },
    update: {},
    create: {
      nazev_firmy: 'ABC Corporation',
      ico: '555555555',
      dic: 'CZ098765',
      tel: '555 555 555',
      email: 'user3@example.com',
      password: 'password3',
      address: {
        create: {
          mesto: 'Liberec',
          ulice: 'Česká',
          cislo_popis: '2',
          cislo_orient: '',
          psc: '460 01',
        },
      },
      branch: {
        create: [
          {
            tel: '333333333',
            email: 'branch4@example.com',
            address: {
              create: {
                mesto: 'Liberec',
                ulice: 'Česká',
                cislo_popis: '2',
                cislo_orient: '',
                psc: '460 01',
              },
            },
          },
          {
            tel: '444444444',
            email: 'branch5@example.com',
            address: {
              create: {
                mesto: 'Hradec Králové',
                ulice: 'Náměstí Míru',
                cislo_popis: '3',
                cislo_orient: '',
                psc: '500 01',
              }
            }
          }
        ]
      }
    }
  });

  const user4 = await prisma.user.upsert({
    where: { email: 'user4@example.com' },
    update: {},
    create: {
      nazev_firmy: 'Def Corporation',
      ico: '777777777',
      dic: 'CZ135791',
      tel: '777 777 777',
      email: 'user4@example.com',
      password: 'password4',
      address: {
        create: {
          mesto: 'Olomouc',
          ulice: 'Horní náměstí',
          cislo_popis: '1',
          cislo_orient: '',
          psc: '778 01',
        },
      },
      branch: {
        create: [
          {
            tel: '555555555',
            email: 'branch6@example.com',
            address: {
              create: {
                mesto: 'Olomouc',
                ulice: 'Horní náměstí',
                cislo_popis: '1',
                cislo_orient: '',
                psc: '778 01',
              },
            },
          },
          {
            tel: '666666666',
            email: 'branch7@example.com',
            address: {
              create: {
                mesto: 'České Budějovice',
                ulice: 'Náměstí Přemysla Otakara II',
                cislo_popis: '4',
                cislo_orient: '',
                psc: '370 01',
              }
            }
          }
        ]
      }
    }
  });
}

main()
  .catch(e => {
    throw e
  })