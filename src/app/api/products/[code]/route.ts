import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    if (!params.code || params.code.length !== 20) {
      return NextResponse.json("invalid param", { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { code: params.code },
      select: {
        description: true,
        name: true,
        code: true,
        price: true,
        discount: true,
        images: {
          select: {
            link: true,
          },
        },
      },
    });

    if (product !== null) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json("product not found", { status: 404 });
    }
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching all products");
  }
}
