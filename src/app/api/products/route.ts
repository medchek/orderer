import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import {
  apiErrorResponse,
  isUniqueConstraintPrismaError,
  toPositiveNumber,
  uniqueId,
} from "@/lib/utils";
import Joi from "joi";

import { isAdmin } from "../auth/[...nextauth]/route";
import {
  CATEGORY_CODE_LENGTH,
  PRODUCT_CODE_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { GetProductsSuccessResponse } from "@/features/products/api/getProducts";
import {
  PostProductBodyPayload,
  PostProductSuccessResponse,
} from "@/features/products/api/postProduct";
import { Prisma } from "@prisma/client";
import { imageIdRegex } from "@/lib/patterns";
import { AllowedProductsFilterParams } from "@/features/products/types";

export async function GET(req: NextRequest) {
  try {
    const isAdminReq = await isAdmin();
    /**
     * FILTERS HANDLING
     */

    // product name
    const nameParam = req.nextUrl.searchParams.get("name")?.trim();
    const name =
      nameParam && nameParam.length >= 2 && nameParam.length <= 200
        ? nameParam
        : undefined;
    // price
    const minPriceParam = req.nextUrl.searchParams.get(
      "minPrice" as AllowedProductsFilterParams,
    );
    const minPrice = minPriceParam
      ? toPositiveNumber(minPriceParam)
      : undefined;

    const maxPriceParam = req.nextUrl.searchParams.get(
      "maxPrice" as AllowedProductsFilterParams,
    );
    const maxPrice = maxPriceParam
      ? toPositiveNumber(maxPriceParam)
      : undefined;
    // stock
    const minStockParam = req.nextUrl.searchParams.get(
      "minStock" as AllowedProductsFilterParams,
    );
    const minStock =
      minStockParam && isAdminReq ? toPositiveNumber(minStockParam) : undefined;

    const maxStockParam = req.nextUrl.searchParams.get(
      "maxStock" as AllowedProductsFilterParams,
    );
    const maxStock =
      maxStockParam && isAdminReq ? toPositiveNumber(maxStockParam) : undefined;

    // discount
    const discountParam = req.nextUrl.searchParams.get(
      "isDiscount" as AllowedProductsFilterParams,
    );

    const discount =
      discountParam === "1" || discountParam === "0"
        ? discountParam
        : undefined;

    // category
    const categoryParam = req.nextUrl.searchParams
      .get("category" as AllowedProductsFilterParams)
      ?.trim();
    const category =
      categoryParam && categoryParam.length === CATEGORY_CODE_LENGTH
        ? categoryParam
        : undefined;
    const subcategoryParam = req.nextUrl.searchParams
      .get("subcategory" as AllowedProductsFilterParams)
      ?.trim();
    const subcategory =
      subcategoryParam && subcategoryParam.length === CATEGORY_CODE_LENGTH
        ? subcategoryParam
        : undefined;

    // inStock is only allowed for non admin users

    const inStockParam = req.nextUrl.searchParams
      .get("category" as AllowedProductsFilterParams)
      ?.trim();

    const inStock =
      inStockParam && (inStockParam === "0" || inStockParam === "1")
        ? // inStock = greater than 1
          1
        : undefined;

    /**
     * PAGINATION
     */

    const pageParam = req.nextUrl.searchParams.get("page");

    const currentPage = pageParam ? toPositiveNumber(pageParam) : 0;
    const productsPerPage = 10;

    const conditions: Prisma.ProductFindManyArgs | Prisma.ProductCountArgs = {
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
        category: {
          code: category,
        },
        subCategory: {
          code: subcategory,
        },
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        stock: {
          // if inStock is provided, disable the minStock
          gte: inStock ?? minStock,
          // if the inStock param is provided, disable the maxStock
          lte: !inStock ? maxStock : undefined,
        },
        discount: {
          // returns only the product are not on discount

          gt: discount === "1" ? 1 : undefined,
          // returns only the product whuch are not on discount, i.e. their discount value is 0 (which is the default as well)
          equals: discount === "0" ? 0 : undefined,
        },
      },
    };

    const products = await prisma.$transaction([
      prisma.product.count({
        where: conditions.where,
      }),
      prisma.product.findMany({
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
            select: { name: true, code: true },
          },
          subCategory: {
            select: { name: true, code: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: productsPerPage,
        skip: currentPage * productsPerPage,
        where: conditions.where,
      }),
    ]);

    return NextResponse.json<GetProductsSuccessResponse>({
      count: products[0],
      products: products[1],
    });
  } catch (e) {
    console.error("Error fetching all products", e);
    return apiErrorResponse("Error fetching all products");
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json("unauthorized", { status: STATUS_UNAUTHORIZED });
    }
    const body: PostProductBodyPayload = await req.json();
    // console.log("request body => ", body);

    const schema = Joi.object<PostProductBodyPayload>({
      name: Joi.string().min(2).max(150).required(),
      price: Joi.number()
        .strict()
        .positive()
        .precision(2)
        .min(1)
        .max(1000000000000)
        .required(),
      description: Joi.string().allow(""),
      stock: Joi.number().strict().positive().min(1).precision(0).allow(null),
      category: Joi.object({
        categoryCode: Joi.string()
          .strict()
          .length(CATEGORY_CODE_LENGTH)
          .required(),
        subcategoryCode: Joi.string()
          .strict()
          .length(CATEGORY_CODE_LENGTH)
          .optional(),
      })
        .strict()
        .allow(null)
        .required(),
      discount: Joi.number()
        .strict()
        .positive()
        .allow(0)
        .min(0)
        .max(100)
        .precision(0),
      images: Joi.array()
        .min(1)
        .max(5)
        .required()
        .items(Joi.string().pattern(imageIdRegex)),
    });

    // validate the request json object
    const validation = schema.validate(body);
    if (validation.error || !validation.value) {
      console.error(
        "Invalid post product request with error",
        validation.error,
      );
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST);
    }
    // validated data
    const data = validation.value;

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
        categoryCode: data.category?.categoryCode ?? null,
        subCategoryCode: data.category?.subcategoryCode ?? null,
        description: data.description.trim(),
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

    const responsePayload: PostProductSuccessResponse = {
      code,
      category: product.category
        ? { name: product.category.name, code: product.category.code }
        : null,
      subCategory: product.subCategory
        ? { name: product.subCategory.name, code: product.subCategory.code }
        : null,
      description: product.description,
      discount: product.discount,
      images: product.images,
      name: product.name,
      price: product.price,
      stock: product.stock,
    };

    return NextResponse.json<PostProductSuccessResponse>(responsePayload, {
      status: STATUS_CREATED,
    });
  } catch (e) {
    if (isUniqueConstraintPrismaError(e)) {
      return apiErrorResponse("product name already exists", STATUS_CONFLICT);
    }

    console.error("Erros posting a product:", e);
    return apiErrorResponse("Error posting product");
  }
}
