import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../auth/[...nextauth]/route";
import { apiErrorResponse, isNotFoundPrismaError } from "@/lib/utils";
import {
  PHONE_ENTRY_ID_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { prisma } from "../../../../../prisma/db";

export async function DELETE(_: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }
    // id param
    const id = params.id;

    if (!id || id.length !== PHONE_ENTRY_ID_LENGTH) {
      return apiErrorResponse("invalid param", STATUS_BAD_REQUEST);
    }

    await prisma.phone.update({
      data: {
        isBlacklisted: false,
        blacklistReason: null,
      },
      where: { id },
    });
    return NextResponse.json("blacklisted number successfully deleted", {
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
