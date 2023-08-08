import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import { apiErrorResponse, isUniqueConstraintPrismaError, uniqueId } from "@/lib/utils";
import Joi from "joi";
import {
  GetProductsSuccessResponsePayload,
  PostProductBodyPayload,
  PostProductSuccessResponsePayload,
} from "@/types/api";
import { isAdmin } from "../auth/[...nextauth]/route";
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

    const count = await prisma.product.count();

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
        category: {
          select: { name: true }
        },
        subCategory: {
          select: { name: true }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.$disconnect();
    return NextResponse.json<GetProductsSuccessResponsePayload>({ count, products });
  } catch (e) {
    console.error(e);
    return apiErrorResponse("Error fetching all products");
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json("unauthorized", { status: STATUS_UNAUTHORIZED });
    }
    const body: PostProductBodyPayload = await req.json();
    // console.log("request body => ", body);

    const schema = Joi.object<PostProductBodyPayload>({
      name: Joi.string().min(2).max(150).required(),
      price: Joi.number().strict().strict().positive().precision(2).min(1).max(1000000000000).required(),
      description: Joi.string().allow(""),
      stock: Joi.number().strict().positive().min(1).precision(0).allow(null),
      category: Joi.object({
        categoryId: Joi.number().strict().precision(0).required(),
        subcategoryId: Joi.number().strict().precision(0).optional()
      }).strict().allow(null).required(),
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
        categoryId: data.category?.categoryId ?? null,
        subCategoryId: data.category?.subcategoryId ?? null,
        description: data.description,
        stock: data.stock,
        images: {
          connect: imageIds,
        },
      },
      include: {
        category: true,
        subCategory: true,
        images: true,
      },
    });

    const responsePayload: PostProductSuccessResponsePayload = {
      code,
      category: product.category ? { name: product.category.name } : null,
      subCategory: product.subCategory ? { name: product.subCategory.name } : null,
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

    if (isUniqueConstraintPrismaError(e)) {
      return apiErrorResponse("product name already exists",
        STATUS_CONFLICT,
      );
    }

    console.error("Erros posting a product:", e);
    return apiErrorResponse("Error posting product");
  }
}
