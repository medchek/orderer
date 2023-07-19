import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { apiErrorResponse, uniqueId } from "@/lib/utils";
import Joi from "joi";
import {
  PostProductBodyPayload,
  PostProductSuccessResponsePayload,
} from "@/types/api";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import {
  PRODUCT_CODE_LENGTH,
  STATUS_BAD_REQUEST,
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
    return apiErrorResponse("Error fetching all products");
  }
}

export async function POST(req: NextRequest) {
  if (await isAdmin()) {
    return NextResponse.json("unauthorized", { status: STATUS_UNAUTHORIZED });
  }
  try {
    const body: PostProductBodyPayload = await req.json();
    // console.log("request body => ", body);

    const schema = Joi.object<PostProductBodyPayload>({
      name: Joi.string().min(2).max(150).required(),
      price: Joi.number().strict().strict().positive().precision(2).min(1).max(1000000000000).required(),
      description: Joi.string().allow(""),
      stock: Joi.number().strict().positive().min(1).precision(0).allow(null),
      categoryId: Joi.number().strict().positive().precision(0).allow(null),
      discount: Joi.number().strict().positive().allow(0).min(0).max(100).precision(0),
      images: Joi.array()
        .min(1)
        .max(5)
        .required()
        .items(Joi.string().pattern(/^[a-zA-Z0-9_-]+$/)),
    });

    // validate the request json object
    const validation = schema.validate(body);
    if (validation.error || !validation.value) {
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST)
    }
    // validated data
    const data = validation.value

    // check if the name already exists,
    const doesNameExist = await prisma.product.count({
      where: { name: data.name },
    });

    if (doesNameExist !== 0) {
      return apiErrorResponse("product name already exists",
        STATUS_CONFLICT,
      );
    }

    // check if the posted image ids exist in the db
    const dbImagesIds = await prisma.image.count({
      where: {
        id: { in: data.images },
      },
    });

    // if the user sent images id that are not present in the db
    if (dbImagesIds !== data.images.length) {
      return apiErrorResponse("Wrong image ids", STATUS_NOT_FOUND);
    }
    // prepare the image ids to be connected to the created entry
    const imageIds = data.images.map((id) => ({ id }));
    const code = uniqueId(PRODUCT_CODE_LENGTH);
    const product = await prisma.product.create({
      data: {
        code,
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        description: data.description,
        stock: data.stock,
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

    return NextResponse.json<PostProductSuccessResponsePayload>(
      responsePayload,
      {
        status: STATUS_CREATED,
      }
    );
  } catch (e) {
    console.error("Erros posting a product:", e);
    return apiErrorResponse("Error posting product");
  }
}
