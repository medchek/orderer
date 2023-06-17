import { wilayaData } from "./seedData";
import { uniqueId } from "../src/lib/utils";
import prisma from "./db";

async function main() {
  const firstWilaya = await prisma.wilaya.findFirst({ where: { id: 1 } });
  if (firstWilaya === null) {
    await prisma.wilaya.createMany({
      data: wilayaData,
    });
  }

  if (process.env.NODE_ENV === "development") {
    await prisma.product.create({
      data: {
        code: uniqueId(20),
        name: "Apple Watch Series 8 Gps + Cellular 45mm",
        description: "Couleur: Midnight",
        price: 5000,
        stock: 3,
        discount: 10,
        images: {
          create: [
            {
              link: "https://scontent.falg6-2.fna.fbcdn.net/v/t45.5328-4/350058072_6619365291415410_3353060098354417131_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=c48759&_nc_eui2=AeFaq8GFJOynTifnKQDYaH8sXI7Y4N6Fynxcjtjg3oXKfAJ8eqE31XSXmEQ_Lz-arJvfSJgKK0mi3aTZPyAu4jRN&_nc_ohc=BLd2ZpGo-C8AX_mcKUq&_nc_ht=scontent.falg6-2.fna&oh=00_AfADioqaDDdG_82yqV8DdccvyIcAI1gwG2ISiGlmcNLVYQ&oe=64875FA3",
            },
          ],
        },
      },
      include: {
        images: true,
      },
    });
    await prisma.product.create({
      data: {
        code: uniqueId(20),
        name: "Canon eos 90D",
        description: "Couleur: Black",
        price: 22000,
        stock: 1,
        discount: 0,
        images: {
          create: [
            {
              link: "https://scontent.falg6-2.fna.fbcdn.net/v/t45.5328-4/342963958_6153242754783073_8118885326736648695_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=c48759&_nc_ohc=kpcvK32IIO8AX9OWHlZ&_nc_ht=scontent.falg6-2.fna&oh=00_AfB0m-zsmsr96csa5bEqXMWmeSKAAI13l4Z_xyiJrnAFcw&oe=648F7248",
            },
          ],
        },
      },
      include: {
        images: true,
      },
    });
    await prisma.product.create({
      data: {
        code: uniqueId(20),
        name: "Haino teko RW-23",
        description: "Couleur: Black",
        price: 6000,
        stock: 1,
        discount: 0,
        images: {
          create: [
            {
              link: "https://scontent.falg6-1.fna.fbcdn.net/v/t39.30808-6/351112380_767698598402514_7849551208357581038_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=c1enuaklEs0AX8QX57p&_nc_ht=scontent.falg6-1.fna&oh=00_AfBdtjFEwDND4bsFA25PnuMpqBcAtP11dSvL34uBpTxWSQ&oe=64900683",
            },
          ],
        },
      },
      include: {
        images: true,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
