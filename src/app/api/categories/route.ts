import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import {
  apiErrorResponse,
  isUniqueConstraintPrismaError,
  uniqueId,
} from "@/lib/utils";

import Joi from "joi";
import {
  CATEGORY_CODE_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_CREATED,
  STATUS_OK,
} from "@/lib/constants";
import { prisma } from "../../../../prisma/db";
import {
  PostCategoryRequestPayload,
  PostCategorySuccessReponse,
} from "@/features/categories/api/postCategory";
import { GetCategoriesSuccessResponse } from "@/features/categories/api/getCategories";

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const body: PostCategoryRequestPayload = await req.json();

    const schema = Joi.object<PostCategoryRequestPayload>({
      name: Joi.string().min(3).max(200).required(),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      return apiErrorResponse(
        "Validation error: Invalid request",
        STATUS_BAD_REQUEST,
      );
    }

    const createdCategory = await prisma.category.create({
      data: {
        name: validation.value.name,
        nameLowercase: validation.value.name.toLowerCase(),
        code: uniqueId(CATEGORY_CODE_LENGTH),
      },
      select: {
        name: true,
        code: true,
      },
    });

    return NextResponse.json<PostCategorySuccessReponse>(createdCategory, {
      status: STATUS_CREATED,
    });
  } catch (error) {
    if (isUniqueConstraintPrismaError(error)) {
      return apiErrorResponse("category name already exists", STATUS_CONFLICT);
    }

    console.error("Error saving category:", error);
    return apiErrorResponse("Couln't save category");
  }
}

export async function GET(_: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    // const count = await prisma.category.count();
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        code: true,
        subCategories: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });

    return NextResponse.json<GetCategoriesSuccessResponse>(categories, {
      status: STATUS_OK,
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    return apiErrorResponse("Couln't get categories");
  }
}
