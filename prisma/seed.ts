import { dummyProductData, wilayaData } from "./seedData";
import { prisma } from "./db";
import { uniqueId } from "../src/lib/utils";

interface FakeProductData {
  id: number;
  title: string;
  price: 109.95;
  description: string;
  category: string;
  image: string;
}

async function main() {
  const firstWilaya = await prisma.wilaya.findFirst({ where: { id: 1 } });
  if (firstWilaya === null) {
    await prisma.wilaya.createMany({
      data: wilayaData,
    });
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

    // grab more data from a testing api and inject them inside the db as well,
    // this will allow testing for pagination

    const data = await fetch("https://fakestoreapi.com/products");
    const fakeProducts = await (data.json() as Promise<FakeProductData[]>);

    fakeProducts.forEach(async ({ title, description, image, price }) => {
      await prisma.product.create({
        data: {
          code: uniqueId(20),
          name: title,
          price: Math.floor(price * 100),
          description,
          stock: 3,

          images: {
            create: [{ link: image }],
          },
        },
        include: {
          images: true,
        },
      });
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
