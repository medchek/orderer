import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { apiErrorResponse, isNotFoundPrismaError } from "@/lib/utils";
import {
  SHIPPING_LOCATION_ID_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { googleMapsLinkRegex } from "@/lib/patterns";
import Joi from "joi";
import { prisma } from "../../../../../prisma/db";
import {
  PatchLocationPayload,
  PatchProductSuccessResponse,
} from "@/features/shipping-locations/api/patchLocation";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id?: string } },
) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }
    if (!params.id || params.id.length !== SHIPPING_LOCATION_ID_LENGTH) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    await prisma.locations.delete({
      where: {
        id: params.id.trim(),
      },
    });

    return NextResponse.json<string>("ok", { status: STATUS_OK });
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("location not found", STATUS_NOT_FOUND);
    }

    console.error("Error deleting shipping location", error);
    return apiErrorResponse("Couln't delete shipping location");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id?: string } },
) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    if (!params.id || params.id.length !== SHIPPING_LOCATION_ID_LENGTH) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    const body: PatchLocationPayload = await req.json();

    const schema = Joi.object<PatchLocationPayload>({
      name: Joi.string().trim().min(2).max(150).optional(),
      additionalCosts: Joi.number().strict().positive().allow(null).optional(),
      coordinates: Joi.string()
        .trim()
        .strict()
        .regex(googleMapsLinkRegex)
        .allow(null)
        .optional(),
      wilaya: Joi.number().strict().positive().min(1).max(58).optional(),
      town: Joi.number().strict().positive().min(1001).max(58099).optional(),
    });

    const { error, value: data } = schema.validate(body);

    if (error || !data) {
      console.error("Error validating shipping location body", error);
      return apiErrorResponse(
        "Validation error: Invalid request",
        STATUS_BAD_REQUEST,
      );
    }

    const { name, additionalCosts, coordinates, wilaya, town } = data;

    await prisma.locations.update({
      where: {
        id: params.id,
      },
      data: {
        name: name,
        coordinates: coordinates,
        additionalCosts,
        townCode: town,
        wilayaCode: wilaya,
      },
    });

    return NextResponse.json<PatchProductSuccessResponse>("ok", {
      status: STATUS_OK,
    });
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("location not found", STATUS_NOT_FOUND);
    }

    console.error("Error patching shipping location", error);
    return apiErrorResponse("Couln't patch shipping location");
  }
}
