import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../../prisma/db";
import {
  PRODUCT_CODE_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { apiErrorResponse, } from "@/lib/utils";
import Joi from "joi";
import { PatchProductBodyPayload } from "@/types/api";
import { isAdmin } from "../../auth/[...nextauth]/route";

export async function GET(
  _: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    if (!params.code || params.code.length !== PRODUCT_CODE_LENGTH) {
      return NextResponse.json("invalid param", { status: STATUS_BAD_REQUEST });
    }

    const product = await prisma.product.findUnique({
      where: { code: params.code },
      select: {
        description: true,
        name: true,
        code: true,
        price: true,
        discount: true,
        stock: true,
        images: {
          select: {
            id: true,
          },
        },
      },
    });

    if (product !== null) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json("product not found", {
        status: STATUS_NOT_FOUND,
      });
    }
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching for product");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  if (!params.code || params.code.length !== PRODUCT_CODE_LENGTH) {
    return NextResponse.json("invalid param", { status: STATUS_BAD_REQUEST });
  }

  try {
    if (await !isAdmin()) {
      return NextResponse.json("unauthorized", { status: STATUS_UNAUTHORIZED });
    }

    const body: PatchProductBodyPayload = await req.json();

    const schema = Joi.object<PatchProductBodyPayload>({
      name: Joi.string().min(2).max(150),
      price: Joi.number().positive().min(1).precision(2).max(1000000000000),
      description: Joi.string().allow(""),
      stock: Joi.number().positive().precision(0).min(1).allow(null),
      categoryId: Joi.number().positive().precision(0).allow(null),
      discount: Joi.number().positive().precision(0).allow(0).min(0).max(100),
      images: Joi.object({
        added: Joi.array()
          .min(0)
          .max(5)
          .items(Joi.string().pattern(/^[a-zA-Z0-9_-]+$/)),
        removed: Joi.array()
          .min(0)
          .max(5)
          .items(Joi.string().pattern(/^[a-zA-Z0-9_-]+$/)),
      }).optional(),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      console.log("validationError:", validation.error);
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST)
    }

    const data = validation.value;

    // product to update
    const product = await prisma.product.findUnique({
      where: { code: params.code },
      include: {
        images: true,
      }
    })

    if (!product) {
      return apiErrorResponse("product not found", STATUS_NOT_FOUND)
    }

    const dbimages = product.images.map((data => data.id))

    // if there are images to remove
    if (data.images && data.images.removed.length > 0) {
      // delete them from the db only if they belong to the request product
      const validImgIds = data.images.removed.every((imgId) => {
        return dbimages.includes(imgId)
      })
      // if the images are valid, delete them from the db
      if (validImgIds) {
        await prisma.image.deleteMany({
          where: {
            id: {
              in: data.images.removed
            }
          }
        })
      }
    }
    // check if the images to add exist in the db
    if (data.images && data.images.added.length > 0) {
      const addImgDbCount = await prisma.image.count({
        where: {
          id: {
            in: data.images.added
          }
        }
      })
      // if the count is the same
      if (addImgDbCount !== data.images.added.length) {
        return apiErrorResponse("Invalid request. Add images wrong id", STATUS_BAD_REQUEST)
      }
    }


    const { images, ...rest } = data;
    const updatedProduct = await prisma.product.update({
      where: {
        code: params.code,
      },
      data: {
        ...rest,
        ...(images?.added.length && {
          images: {
            connect: images.added.map((id) => ({ id }))
          }
        })
      },
      include: {
        images: true
      },

    })
    const { id, ...responsePayload } = updatedProduct;
    return NextResponse.json(responsePayload, { status: STATUS_OK })

  } catch (error) {
    return apiErrorResponse("Error updating product")
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { code: string } }
) {
  if (!params.code || params.code.length !== PRODUCT_CODE_LENGTH) {
    return apiErrorResponse("Invalid param", STATUS_BAD_REQUEST);
  }

  try {
    if (await !isAdmin()) {
      return apiErrorResponse("Unauthorized", STATUS_UNAUTHORIZED);
    }

    const product = await prisma.product.delete({
      where: {
        code: params.code,
      },
    });



    console.log("DELETE SUCCESSFUL, RESULTS:", product);

    // TODO: REMOVE CASCADED IMAGES FROM THE GOOGLE DRIVE

    return NextResponse.json("ok", { status: STATUS_OK });
  } catch (error) {
    console.log(`Error deleting product with code [${params.code}]`, error);
    return apiErrorResponse("Product not found", STATUS_NOT_FOUND)
  }
}
