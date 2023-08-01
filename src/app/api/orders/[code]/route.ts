import { apiErrorResponse } from "@/lib/utils";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { type NextRequest, NextResponse } from "next/server";
import { ORDER_CODE_LENGTH, STATUS_BAD_REQUEST, STATUS_OK, STATUS_UNAUTHORIZED } from "@/lib/constants";
import { prisma } from "../../../../../prisma/db";

export async function DELETE(_: NextRequest, { params }: { params: { code: string } }
) {
  if (!params.code || params.code.length !== ORDER_CODE_LENGTH) {
    return NextResponse.json("invalid param", { status: STATUS_BAD_REQUEST });
  }

  try {
    if (!await isAdmin()) {
      return NextResponse.json("unauthorized", { status: STATUS_UNAUTHORIZED });
    }

    await prisma.order.delete({
      where: {
        code: params.code
      }
    })

    return NextResponse.json("", { status: STATUS_OK })
  } catch (error) {
    console.error(`Error deleting order with code ${params.code}: `, error)
    return apiErrorResponse(`Couln't delete order with code ${params.code}`)
  }
}


