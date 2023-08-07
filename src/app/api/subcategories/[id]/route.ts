import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, isNotFoundPrismaError, toNumber } from "@/lib/utils";
import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND, STATUS_OK, STATUS_UNAUTHORIZED } from "@/lib/constants";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../../prisma/db";
import { PatchCategoryRequestPayload, PatchSubcategorySuccessResponsePayload } from "@/types/api";
import Joi from "joi";


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // if (!await isAdmin()) {
    //   return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    // }

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

    const patchedSubcategory: PatchSubcategorySuccessResponsePayload = await prisma.subCategory.update({
      where: { id: toNumber(params.id) },
      data: {
        name: validation.value.name
      },
    })

    return NextResponse.json(patchedSubcategory, { status: STATUS_OK })

  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("subcategory not found", STATUS_NOT_FOUND)
    }




    if (error instanceof SyntaxError) {
      return apiErrorResponse("empty body", STATUS_BAD_REQUEST)
    }
    console.error("Error updaing subcategory", error)
    return apiErrorResponse("Could not update subcategory")
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

    await prisma.subCategory.delete({ where: { id: toNumber(params.id) } })
    return NextResponse.json("subcategory successfully deleted", { status: STATUS_OK })
  } catch (error) {
    console.error("Error deleting subcategory:", error)
    return apiErrorResponse("Could not delete subcategory")
  }

}

