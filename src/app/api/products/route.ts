import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { isAdmin, uniqueId } from "@/lib/utils";
import Joi from "joi";
import {
  PostProductBodyPayload,
  PostProductSuccessResponsePayload,
} from "@/types/api";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  PRODUCT_CODE_LENGTH,
  STATUS_CONFLICT,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";

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
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching all products");
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!isAdmin(session)) {
    return NextResponse.json("unauthorized", { status: STATUS_UNAUTHORIZED });
  }
  try {
    const body: PostProductBodyPayload = await req.json();
    // console.log("request body => ", body);

    const schema = Joi.object<PostProductBodyPayload>({
      name: Joi.string().min(2).max(150).required(),
      price: Joi.number().positive().min(1).max(1000000000000).required(),
      description: Joi.string().allow(""),
      stock: Joi.number().positive().min(1).allow(null),
      categoryId: Joi.number().positive().allow(null),
      discount: Joi.number().positive().allow(0).min(0).max(100),
      images: Joi.array()
        .min(1)
        .max(5)
        .required()
        .items(Joi.string().pattern(/^[a-zA-Z0-9_-]+$/)),
    });

    const values = await schema.validateAsync(body);

    // check if the name already exists,

    const doesNameExist = await prisma.product.count({
      where: { name: values.name },
    });

    if (doesNameExist !== 0) {
      return NextResponse.json("product name already exists", {
        status: STATUS_CONFLICT,
      });
    }

    const dbImagesIds = await prisma.image.count({
      where: {
        id: { in: values.images },
      },
    });

    // if the user sent images id that are not present in the db
    console.log(dbImagesIds, values.images);
    if (dbImagesIds !== values.images.length) {
      return NextResponse.json("wrong image ids", { status: STATUS_NOT_FOUND });
    }
    // prepare the image ids to be connected to the created entry
    const imageIds = values.images.map((id) => ({ id }));
    const code = uniqueId(PRODUCT_CODE_LENGTH);
    const product = await prisma.product.create({
      data: {
        code,
        name: values.name,
        price: values.price,
        categoryId: values.categoryId,
        description: values.description,
        stock: values.stock,
        images: {
          connect: imageIds,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    const responsePayload: PostProductSuccessResponsePayload = {
      code,
      categoryId: product.categoryId,
      description: product.description,
      discount: product.discount,
      images: product.images,
      name: product.name,
      price: product.price,
      stock: product.stock,
    };

    console.log("success!", product);
    return NextResponse.json<PostProductSuccessResponsePayload>(
      responsePayload,
      {
        status: STATUS_CREATED,
      }
    );
  } catch (e) {
    console.error("Erros posting a product:", e);
    return NextResponse.json("Error posting product");
  }
}
