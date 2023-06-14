import { PrismaClient } from "@prisma/client";
import { wilayaData } from "./seedData";
import { uniqueId } from "../src/lib/utils";
import prisma from "./db";

async function main() {
  await prisma.wilaya.createMany({
    data: wilayaData,
  });

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
