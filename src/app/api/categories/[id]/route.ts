import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, isNotFoundPrismaError, toNumber } from "@/lib/utils";
import { PRISMA_NOT_FOUND_ERROR_CODE, STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_NOT_FOUND, STATUS_OK, STATUS_UNAUTHORIZED } from "@/lib/constants";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../../prisma/db";
import { Prisma } from "@prisma/client";
import { PatchCategoryRequestPayload, PatchCategorySuccessResponsePayload } from "@/types/api";
import Joi from "joi";




export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!await isAdmin()) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    if (!params.id || toNumber(params.id) === 0) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    const body: PatchCategoryRequestPayload = await req.json();


    const schema = Joi.object<PatchCategoryRequestPayload>({
      name: Joi.string().min(2).max(200).required(),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST)
    }

    const patchedCategory: PatchCategorySuccessResponsePayload = await prisma.category.update({
      where: { id: toNumber(params.id) },
      data: {
        name: validation.value.name
      }
    })

    return NextResponse.json(patchedCategory, { status: STATUS_OK })

  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("category not found", STATUS_NOT_FOUND)
    }
    if (error instanceof SyntaxError) {
      return apiErrorResponse("empty body", STATUS_BAD_REQUEST)
    }
    return apiErrorResponse("Could not update category")
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin()) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    if (!params.id || toNumber(params.id) === 0) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    await prisma.category.delete({ where: { id: toNumber(params.id) } })
    return NextResponse.json("category successfully deleted", { status: STATUS_OK })
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("category not found", STATUS_NOT_FOUND)
    }
    console.error("Error deleting category:", error)
    return apiErrorResponse("Could not delete category")
  }

}

