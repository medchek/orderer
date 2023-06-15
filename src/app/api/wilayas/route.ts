import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
import { cache } from "@/lib/cache";

export async function GET() {
  try {
    // get cached results
    const cachedWilayas = cache.get("wilayas");
    const ttl =
      process.env.NODE_ENV === "production" ? 120 * (60 * 1000) : 1000 * 60;

    if (cachedWilayas === undefined) {
      // if there are no cached resuts, search the db
      const wilayas = await prisma.wilaya.findMany({
        select: {
          name: true,
          code: true,
          homePrice: true,
          officePrice: true,
          arName: true,
        },
        where: { available: true },
      });
      // then save the data in the cache
      cache.set("wilayas", wilayas, { ttl });
      await prisma.$disconnect();
      return NextResponse.json(wilayas);
    } else {
      // else return cached data
      return NextResponse.json(cachedWilayas);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json("Error getting wilayas", { status: 500 });
  }
}

async function PATCH() {
  // TODO: Delete cache when updated
  cache.delete("wilayas");
}
