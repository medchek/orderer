import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { apiErrorResponse } from "@/lib/utils";
import { GetCategoriesSuccessResponsePayload, PostCategoryRequestPayload, PostCategorySuccessReponsePayload } from "@/types/api";
import Joi from "joi";
import { STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_OK } from "@/lib/constants";
import { prisma } from "../../../../prisma/db";

export async function POST(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const body: PostCategoryRequestPayload = await req.json();

    const schema = Joi.object<PostCategoryRequestPayload>({
      name: Joi.string().min(3).max(200).required(),

    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      return apiErrorResponse("Validation error: Invalid request", STATUS_BAD_REQUEST)
    }

    const createdCategory: PostCategorySuccessReponsePayload = await prisma.category.create({
      data: body
    })

    return NextResponse.json(createdCategory, { status: STATUS_CREATED })
  } catch (error) {
    console.error("Error saving category:", error)
    return apiErrorResponse("Couln't save category")
  }

}


export async function GET(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const categories: GetCategoriesSuccessResponsePayload = await prisma.category.findMany({
      select: {
        name: true,
        id: true,
        subCategories: {
          select: {
            name: true,
            id: true,
          }
        }
      }
    })

    return NextResponse.json(categories, { status: STATUS_OK })
  } catch (error) {
    console.error("Error getting categories:", error)
    return apiErrorResponse("Couln't get categories")
  }

}

