import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { apiErrorResponse, toPositiveNumber, uniqueId } from "@/lib/utils";
import {
  PostShippingLocationRequestPayload,
  PostShippingLocationResponse,
} from "@/features/shipping-locations/api/postLocation";
import {
  SHIPPING_LOCATION_ID_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import Joi from "joi";
import { prisma } from "../../../../prisma/db";
import { googleMapsLinkRegex } from "@/lib/patterns";
import { GetShippingLocationsSuccessResponse } from "@/features/shipping-locations/api/getLocations";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    /**
     * PAGINATION
     */

    const pageParam = req.nextUrl.searchParams.get("page");

    const currentPage = pageParam ? toPositiveNumber(pageParam) : 0;
    const locationsPerPage = 10;

    /**
     * Filters
     */

    // product name
    const nameParam = req.nextUrl.searchParams.get("name")?.trim();
    const name =
      nameParam && nameParam.length >= 2 && nameParam.length <= 150
        ? nameParam
        : undefined;

    const wilayaParam = toPositiveNumber(
      req.nextUrl.searchParams.get("wilaya")?.trim() ?? "0",
    );
    const wilaya =
      wilayaParam && wilayaParam >= 1 && wilayaParam <= 58
        ? wilayaParam
        : undefined;

    const townParam = toPositiveNumber(
      req.nextUrl.searchParams.get("town")?.trim() ?? "0",
    );
    const town =
      townParam && townParam >= 1001 && townParam <= 58099
        ? townParam
        : undefined;

    const hasCoordParam = req.nextUrl.searchParams
      .get("hasCoordinates")
      ?.trim();

    const hasCoord =
      hasCoordParam && hasCoordParam !== "1" && hasCoordParam !== "0"
        ? undefined
        : hasCoordParam;

    const conditions: Prisma.LocationsFindManyArgs | Prisma.LocationsCountArgs =
      {
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
          wilayaCode: wilaya,
          townCode: town,
          coordinates: {
            // if the user requests all the locations that do have coodinates set
            not: hasCoord && hasCoord === "1" ? null : undefined,
            // if the user requests all the locations that do not have x coordinates set
            equals: hasCoord && hasCoord === "0" ? null : undefined,
          },
        },
      };


    const locations = await prisma.$transaction([
      prisma.locations.count({
        where: conditions.where,
      }),
      prisma.locations.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: conditions.where,

        take: locationsPerPage,
        skip: currentPage * locationsPerPage,
        select: {
          id: true,
          name: true,
          additionalCosts: true,
          coordinates: true,
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
      }),
    ]);

    return NextResponse.json<GetShippingLocationsSuccessResponse>(
      {
        count: locations[0],
        data: locations[1],
      },
      {
        status: STATUS_OK,
      },
    );
  } catch (error) {
    console.error("Error getting shipping locations", error);
    return apiErrorResponse("Error fetching all shipping locations");
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const body: PostShippingLocationRequestPayload = await req.json();

    const schema = Joi.object<PostShippingLocationRequestPayload>({
      name: Joi.string().trim().min(2).max(150).required(),
      additionalCosts: Joi.number().strict().positive().allow(null).optional(),
      coordinates: Joi.string()
        .trim()
        .strict()
        .regex(googleMapsLinkRegex)
        .allow(null)
        .optional(),
      wilaya: Joi.number().strict().positive().min(1).max(58).required(),
      town: Joi.number().strict().positive().min(1001).max(58099).required(),
    });

    const { error, value: data } = schema.validate(body);

    if (error || !data) {
      console.error("Error validating shipping location body", error);
      return apiErrorResponse(
        "Validation error: Invalid request",
        STATUS_BAD_REQUEST,
      );
    }

    const { name, additionalCosts, coordinates, town, wilaya } = data;

    const location = await prisma.locations.create({
      data: {
        id: uniqueId(SHIPPING_LOCATION_ID_LENGTH),
        name: name.trim(),
        coordinates: coordinates?.trim(),
        additionalCosts,
        townCode: town,
        wilayaCode: wilaya,
      },
      select: {
        id: true,
        name: true,
        additionalCosts: true,
        coordinates: true,
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

    return NextResponse.json<PostShippingLocationResponse>(location, {
      status: STATUS_CREATED,
    });
  } catch (error) {
    console.error("Error posting shipping location", error);
    return apiErrorResponse("Couln't create shipping location");
  }
}
