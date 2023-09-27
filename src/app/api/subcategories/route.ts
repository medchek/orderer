import { PostSubCategorySuccessResponse } from "./../../../features/categories/api/postSubcategory";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { apiErrorResponse, isNotFoundPrismaError, uniqueId } from "@/lib/utils";

import Joi from "joi";
import {
  CATEGORY_CODE_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_CREATED,
} from "@/lib/constants";
import { prisma } from "../../../../prisma/db";
import { PostSubCategoryRequestPayload } from "@/features/categories/api/postSubcategory";

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const body: PostSubCategoryRequestPayload = await req.json();

    const schema = Joi.object<PostSubCategoryRequestPayload>({
      name: Joi.string().min(3).max(200).required(),
      categoryCode: Joi.string()
        .strict()
        .length(CATEGORY_CODE_LENGTH)
        .required(),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      return apiErrorResponse(
        "Validation error: Invalid request",
        STATUS_BAD_REQUEST,
      );
    }
    const { categoryCode, name } = validation.value;

    // Check if if the provided subcategory name already exists for the requested parent category
    const subcategoryAlreadyExists = await prisma.subCategory.count({
      where: { categoryCode: categoryCode, nameLowercase: name.toLowerCase() },
    });

    if (subcategoryAlreadyExists > 0) {
      return apiErrorResponse(
        "A subcategory with this name already exists for the requested category",
        STATUS_CONFLICT,
      );
    }

    const createdSubcategory: PostSubCategorySuccessResponse =
      await prisma.subCategory.create({
        data: {
          name: name,
          nameLowercase: name.toLowerCase(),
          code: uniqueId(CATEGORY_CODE_LENGTH),
          categoryCode,
        },
      });

    return NextResponse.json<PostSubCategorySuccessResponse>(
      createdSubcategory,
      { status: STATUS_CREATED },
    );
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse(
        "Validation error: Invalid category Id",
        STATUS_BAD_REQUEST,
      );
    }

    console.error("Error saving category:", error);
    return apiErrorResponse("Couln't save category");
  }
}
