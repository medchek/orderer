import { apiErrorResponse } from "@/lib/utils";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { type NextRequest, NextResponse } from "next/server";
import { ORDER_CODE_LENGTH, STATUS_BAD_REQUEST, STATUS_OK, STATUS_UNAUTHORIZED } from "@/lib/constants";
import { prisma } from "../../../../../prisma/db";
import { Status } from "@prisma/client";
import { PatchOrderRequestPayload } from "@/features/orders/api/patchOrder";

export async function DELETE(_: NextRequest, { params }: { params: { code: string } }
) {
  if (!params.code || params.code.length !== ORDER_CODE_LENGTH) {
    return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
  }

  try {
    if (!await isAdmin()) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    await prisma.order.delete({
      where: {
        code: params.code
      }
    })

    return NextResponse.json({ status: STATUS_OK })
  } catch (error) {
    console.error(`Error deleting order with code ${params.code}: `, error)
    return apiErrorResponse(`Couln't delete order with code ${params.code}`)
  }
}



export async function PATCH(req: NextRequest, { params }: { params: { code: string } }
) {
  if (!params.code || params.code.length !== ORDER_CODE_LENGTH) {
    return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
  }

  try {
    if (!await isAdmin()) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const body: PatchOrderRequestPayload = await req.json();


    const statusList = new Set<Status>(["UNCONFIRMED", "CONFIRMED", "SHIPPING", "SUCCESS", "CANCELED", "RETURNED"])
    if (!statusList.has(body.status)) {
      return apiErrorResponse("wrong status", STATUS_BAD_REQUEST);

    }


    await prisma.order.update({
      where: {
        code: params.code
      },
      data: {
        status: body.status
      }

    })

    return NextResponse.json({ status: STATUS_OK })
  } catch (error) {
    console.error(`Error patching order with code ${params.code}: `, error)
    return apiErrorResponse(`Couln't patch order with code ${params.code}`)
  }
}


