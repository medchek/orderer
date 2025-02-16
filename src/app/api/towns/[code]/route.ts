import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/db"
import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND, STATUS_OK } from "@/lib/constants"
import { apiErrorResponse, isNotFoundPrismaError, toNumber } from "@/lib/utils"

export async function GET(req: NextRequest, props: { params: Promise<{ code: string }> }) {
  const params = await props.params;
  try {



    if (!params.code || toNumber(params.code) <= 0 || toNumber(params.code) > 58) {
      return NextResponse.json("invalid param", { status: STATUS_BAD_REQUEST });
    }

    const towns = await prisma.town.findMany({
      where: { wilayaCode: toNumber(params.code), }, orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json(towns, { status: STATUS_OK })
  } catch (error) {

    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("Wrong wilaya code", STATUS_NOT_FOUND)

    }

    console.error("Error getting tows of wilaya:", error)
    return apiErrorResponse("Couln't get towns")
  }
}

