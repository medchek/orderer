import { apiErrorResponse } from "./../../../lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import { cache } from "@/lib/cache";
import { isAdmin as isAdministrator } from "../auth/[...nextauth]/route";
import {
  STATUS_BAD_REQUEST,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";

import Joi from "joi";
import { PatchShippingPricesRequestPayload } from "@/features/shipping-prices/api/patchWilaya";
// TODO: Implement Rate limiting for all API routes

export async function GET() {
  try {
    // get cached results
    const cachedWilayas = cache.get("wilayas");
    const ttl =
      process.env.NODE_ENV === "production" ? 120 * (60 * 1000) : 1000 * 60;

    // For regular users
    // TODO: RATE LIMIT
    if (cachedWilayas === undefined) {
      // if there are no cached resuts, search the db
      const wilayas = await prisma.wilaya.findMany({
        select: {
          name: true,
          code: true,
          homePrice: true,
          officePrice: true,
          arName: true,
          availableOffice: true,
          availableHome: true,
        },
        orderBy: {
          code: "asc",
        },
      });
      // then save the data in the cache
      cache.set("wilayas", wilayas, { ttl });
      await prisma.$disconnect();
      return NextResponse.json(wilayas, { status: STATUS_OK });
    } else {
      // else return cached data
      return NextResponse.json(cachedWilayas, { status: STATUS_OK });
    }
  } catch (e) {
    console.error("Error fetching wilayas:", e);
    return apiErrorResponse("Error getting wilayas");
  }
}

export async function PATCH(req: NextRequest) {
  // TODO: Delete cache when updated

  const isAdmin = await isAdministrator();
  if (!isAdmin) {
    return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
  }
  try {
    const body: PatchShippingPricesRequestPayload = await req.json();

    const schema = Joi.object<PatchShippingPricesRequestPayload>({
      wilayas: Joi.array()
        .min(1)
        .max(58)
        .items(Joi.number().strict().required().min(1).max(58))
        .required(),
      homePrice: Joi.number().strict().min(0).positive().precision(2),
      officePrice: Joi.number().strict().min(0).positive().precision(2),
      availableHome: Joi.boolean().strict(),
      availableOffice: Joi.boolean().strict(),
    });

    const data = schema.validate(body);

    if (!data.value || data.error) {
      console.error("Error validating patch wilaya data", data.error);
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST);
    }

    const { wilayas, availableHome, availableOffice, homePrice, officePrice } =
      data.value;
    console.log("updating wilya with values", data.value);
    /**
     * todo: before updateing, and if the user wants to make a wilaya unavailable,
     * todo: check if at least one wilaya wil still be available for shipping
     */
    // if the user requests to make a wilaya unavailable
    // if (available === false) {

    // }

    await prisma.wilaya.updateMany({
      where: {
        code: {
          in: wilayas,
        },
      },
      data: {
        availableHome,
        availableOffice,
        homePrice,
        officePrice,
      },
    });

    // delete cache when request is valid
    cache.delete("wilayas");
    return NextResponse.json("ok", { status: STATUS_OK });
  } catch (error) {
    return apiErrorResponse("Error updating wilaya shipping prices");
  }
}
