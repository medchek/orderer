import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { apiErrorResponse } from "@/lib/utils";
import { PostSubCategoryRequestPayload, PostSubCategorySuccessResponsePayload } from "@/types/api";
import Joi from "joi";
import { STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_OK } from "@/lib/constants";
import { prisma } from "../../../../prisma/db";

export async function POST(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const body: PostSubCategoryRequestPayload = await req.json();

    const schema = Joi.object<PostSubCategoryRequestPayload>({
      name: Joi.string().min(3).max(200).required(),
      categoryId: Joi.number().strict().min(1).max(58).required(),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      return apiErrorResponse("Validation error: Invalid request", STATUS_BAD_REQUEST)
    }
    const { categoryId } = validation.value;

    const isCategoryIdValid = prisma.category.count({ where: { id: categoryId } });

    if (!isCategoryIdValid) {
      return apiErrorResponse("Validation error: Invalid category Id", STATUS_BAD_REQUEST)
    }

    const createdSubcategory: PostSubCategorySuccessResponsePayload = await prisma.subCategory.create({
      data: validation.value
    })

    return NextResponse.json(createdSubcategory, { status: STATUS_CREATED })
  } catch (error) {
    console.error("Error saving category:", error)
    return apiErrorResponse("Couln't save category")
  }

}

