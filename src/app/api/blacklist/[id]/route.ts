import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../auth/[...nextauth]/route";
import {
  apiErrorResponse,
  isNotFoundPrismaError,
  toPositiveNumber,
} from "@/lib/utils";
import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { prisma } from "../../../../../prisma/db";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }
    // id param
    const id = toPositiveNumber(params.id);
    
    if (id === 0) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    await prisma.blacklist.delete({
      where: { id },
    });
    return NextResponse.json("category successfully deleted", {
      status: STATUS_OK,
    });
  } catch (error) {
    if (isNotFoundPrismaError(error)) {
      return apiErrorResponse("blacklisted phone not found", STATUS_NOT_FOUND);
    }
    console.error("Error deleting blacklisted phone:", error);
    return apiErrorResponse("Could not delete category");
  }
}
