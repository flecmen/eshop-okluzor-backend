import { PrismaClient, User, Category, Product, Orientace, Barva_latkove, Obrazek_latkove, Barva_prisavkove, Typ_prisavkove, Velikost } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create mock data for the Address and Contact models
  const user1 = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL as string },
    update: {},
    create: {
      nazev_firmy: 'Reflek plus',
      role: 'Admin',
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

  // Kategorie
  await prisma.category.createMany({
    data: [
      { name: 'Náplasťové', description: 'popis' },
      { name: 'Látkové', description: 'popis' },
      { name: 'Přísavkové', description: 'popis' },
      { name: 'Oční krytí', description: 'popis' },
    ]
  })

  // Produkty
  await prisma.product.createMany({
    data: [
      //náplasťové
      { name: 'Pro-Ophta Mini', manufacturer: 'L&R', categoryId: 1, pocet_kusu_v_baleni: 100, rozmery: "100x100" },
      { name: 'Pro-Ophta Maxi', manufacturer: 'L&R', categoryId: 1, pocet_kusu_v_baleni: 100, rozmery: "100x100" },
      { name: 'Opticlude Mini 20ks', manufacturer: '3M', categoryId: 1, pocet_kusu_v_baleni: 20, rozmery: "100x100" },
      { name: 'Pro-Ophta Maxi 20ks', manufacturer: '3M', categoryId: 1, pocet_kusu_v_baleni: 20, rozmery: "100x100" },
      { name: 'Pro-Ophta Mini 100ks', manufacturer: '3M', categoryId: 1, pocet_kusu_v_baleni: 100, rozmery: "100x100" },
      { name: 'Pro-Ophta maxi 100ks', manufacturer: '3M', categoryId: 1, pocet_kusu_v_baleni: 100, rozmery: "100x100" },
      { name: 'Pro-Ophta Mini 30ks', manufacturer: '3M', categoryId: 1, pocet_kusu_v_baleni: 30, rozmery: "100x100" },
      { name: 'Pro-Ophta maxi 30ks', manufacturer: '3M', categoryId: 1, pocet_kusu_v_baleni: 30, rozmery: "100x100" },
      //látkové
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.ZLUTA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.ZELENA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.SVETLE_MODRA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.TMAVE_MODRA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.FIALOVA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.CERVENA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.RUZOVA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.SVETLE_RUZOVA },
      { name: 'Univerzální bez obrázku', manufacturer: '3M', categoryId: 2, s_obrazkem: false, orientace: Orientace.UNI, barva_latkove: Barva_latkove.TELOVA },

      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.BERUSKA },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.MOTYLE },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.KVETINY },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.FOTBALOVY_MIC },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.PLAZOVY_MIC },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.PAVUCINA },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.MIMON_HRANATY },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.MIMON_DVE_OCI },
      { name: 'Univerzální s obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.UNI, obrazek_latkove: Obrazek_latkove.MIMON_KULATY },

      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.AUTO },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.DINO },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.KITTY },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.PIRAT },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.LETADLO },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.PONY },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.PRAVY, obrazek_latkove: Obrazek_latkove.SRDCE },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.AUTO },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.DINO },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.KITTY },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.PIRAT },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.LETADLO },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.PONY },
      { name: 'S obrázkem', manufacturer: '3M', categoryId: 2, s_obrazkem: true, orientace: Orientace.LEVY, obrazek_latkove: Obrazek_latkove.SRDCE },

      //přísavkové
      { name: 'Přísavkový A', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.PRIRODNI, typ_prisavkove: Typ_prisavkove.A },

      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.PRIRODNI, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.SVETLE_RUZOVA, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.CERVENA, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.FIALOVA, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.MODRA, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.ZELENA, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.TYRKYSOVA, typ_prisavkove: Typ_prisavkove.B },
      { name: 'Přísavkový B', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.ZLUTA, typ_prisavkove: Typ_prisavkove.B },

      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.PRIRODNI, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.SVETLE_RUZOVA, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.CERVENA, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.FIALOVA, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.MODRA, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.ZELENA, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.TYRKYSOVA, typ_prisavkove: Typ_prisavkove.C },
      { name: 'Přísavkový C', manufacturer: 'Jaroslava Vavřičková', categoryId: 3, barva_prisavkove: Barva_prisavkove.ZLUTA, typ_prisavkove: Typ_prisavkove.C },

      // oční krytí
      { name: 'Oční krytí', manufacturer: '3M', categoryId: 4, velikost: Velikost.L },
      { name: 'Oční krytí', manufacturer: '3M', categoryId: 4, velikost: Velikost.S },
    ]
  })
}

main()
  .catch(e => {
    throw e
  })