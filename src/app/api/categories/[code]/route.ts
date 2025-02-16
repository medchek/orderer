import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, isNotFoundPrismaError } from "@/lib/utils";
import {
  CATEGORY_CODE_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../../prisma/db";

import Joi from "joi";
import {
  PatchCategoryRequestPayload,
  PatchCategorySuccessResponse,
} from "@/features/categories/api/patchCategory";

export async function PATCH(req: NextRequest, props: { params: Promise<{ code?: string }> }) {
  const params = await props.params;
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    if (!params.code || params.code.length !== CATEGORY_CODE_LENGTH) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    const body: PatchCategoryRequestPayload = await req.json();

    const schema = Joi.object<PatchCategoryRequestPayload>({
      name: Joi.string().min(2).max(200).required(),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST);
    }

    const patchedCategory = await prisma.category.update({
      where: { code: params.code },
      data: {
        name: validation.value.name,
        nameLowercase: validation.value.name.toLowerCase(),
      },
      select: {
        name: true,
        code: true,
      },
    });

    return NextResponse.json<PatchCategorySuccessResponse>(patchedCategory, {
      status: STATUS_OK,
    });
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("category not found", STATUS_NOT_FOUND);
    }
    if (error instanceof SyntaxError) {
      return apiErrorResponse("empty body", STATUS_BAD_REQUEST);
    }
    return apiErrorResponse("Could not update category");
  }
}

export async function DELETE(_: NextRequest, props: { params: Promise<{ code?: string }> }) {
  const params = await props.params;
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    if (!params.code || params.code.length !== CATEGORY_CODE_LENGTH) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    await prisma.category.delete({
      where: { code: params.code },
    });
    return NextResponse.json("category successfully deleted", {
      status: STATUS_OK,
    });
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("category not found", STATUS_NOT_FOUND);
    }
    console.error("Error deleting category:", error);
    return apiErrorResponse("Could not delete category");
  }
}
