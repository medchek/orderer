import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { apiErrorResponse, isUniqueConstraintPrismaError } from "@/lib/utils";

import Joi from "joi";
import {
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

    const createdCategory: PostCategorySuccessReponse =
      await prisma.category.create({
        data: { name: validation.value.name },
      });

    return NextResponse.json(createdCategory, { status: STATUS_CREATED });
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
        id: true,
        subCategories: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return NextResponse.json(
      categories as GetCategoriesSuccessResponse,
      { status: STATUS_OK },
    );
  } catch (error) {
    console.error("Error getting categories:", error);
    return apiErrorResponse("Couln't get categories");
  }
}
