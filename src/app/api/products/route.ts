import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        price: true,
        description: true,
        discount: true,
        code: true,
        stock: true,
        images: {
          select: {
            link: true,
          },
        },
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching all products");
  }
}
