import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/lib/constants";
import {
  apiErrorResponse,
  isNotFoundPrismaError,
  toPositiveNumber,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/db";
import { GetWilayaShippingLocationsSuccessResponse } from "@/features/shipping-locations/api/getWilayaLocations";

export async function GET(
  _: NextRequest,
  { params }: { params: { wilaya?: string } },
) {
  try {
    if (
      !params.wilaya ||
      toPositiveNumber(params.wilaya) <= 0 ||
      toPositiveNumber(params.wilaya) > 58
    ) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    const wilayaShippingLocations: GetWilayaShippingLocationsSuccessResponse = await prisma.locations.findMany({
      where: { wilayaCode: toPositiveNumber(params.wilaya) },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        additionalCosts: true,
        wilaya: {
          select: {
            code: true,
            name: true,
            arName: true,
          },
        },
        town: {
          select: {
            code: true,
            name: true,
            arName: true,
          },
        },
      },
    });

    return NextResponse.json<GetWilayaShippingLocationsSuccessResponse>(
      wilayaShippingLocations,
      { status: STATUS_OK },
    );
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("Wrong wilaya code", STATUS_NOT_FOUND);
    }

    console.error("Error getting wilaya specific shipping locations", error);
    return apiErrorResponse("Couln't get wilaya specific shipping locations");
  }
}
