import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/db"
import { STATUS_BAD_REQUEST, STATUS_OK } from "@/lib/constants"
import { apiErrorResponse, toNumber } from "@/lib/utils"

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  try {



    if (!params.code || toNumber(params.code) <= 0 || toNumber(params.code) > 58) {
      return NextResponse.json("invalid param", { status: STATUS_BAD_REQUEST });
    }

    const towns = await prisma.town.findMany({
      where: { wilayaCode: toNumber(params.code) }
    })

    return NextResponse.json(towns, { status: STATUS_OK })
  } catch (error) {
    console.error("Error getting tows of wilaya:", error)
    return apiErrorResponse("Couln't get towns")
  }

}

