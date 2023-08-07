
import { prisma } from "./db";
import wilayasData from "./seeders/wilayasSeedData";
import { dummyProductData } from "./seeders/productsSeedData";
import townsData from "./seeders/townsSeedData";
import { dummyCategoriesdata } from "./seeders/categoriesSeedData";

interface FakeProductData {
  id: number;
  title: string;
  price: 109.95;
  description: string;
  category: string;
  image: string;
}

async function main() {
  const firstWilaya = await prisma.wilaya.count({ where: { id: 1 } });
  if (firstWilaya === 0) {
    await prisma.wilaya.createMany({
      data: wilayasData,
    });
  }

  // seed towns of wilaya
  const firstTown = await prisma.town.count();

  if (firstTown === 0) {
    const wilayaCodes = Object.keys(townsData);

    for (const wilayCodeSring of wilayaCodes) {
      const wilayCode = parseInt(wilayCodeSring);
      const wilayaTowns = townsData[wilayCodeSring];

      for (const { arName, code, name } of wilayaTowns) {
        await prisma.town.create({
          data: {
            arName,
            name,
            code,
            wilayaCode: wilayCode,
          },
        })
      }
    }
  }

  if (process.env.NODE_ENV === "development") {
    for (let i = 0; i < dummyProductData.length; i++) {
      const product = dummyProductData[i];
      // first, add the product that are pre-set
      await prisma.product.create({
        data: product,
        include: {
          images: true,
        },
      });
    }
  }

  await prisma.category.createMany({
    data: dummyCategoriesdata,
  })
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
