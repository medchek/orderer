import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

import Joi from "joi";
import { phoneRegex } from "@/lib/formValidators";
import { apiErrorResponse } from "@/lib/utils";
import {
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { prisma } from "../../../../prisma/db";
import { GetBlacklistSuccessResponse } from "@/features/blacklist/api/getBlacklist";
import { PostBlacklistRequestPayload } from "@/features/blacklist/api/postBlacklist";


export async function GET() {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const blacklist = await prisma.blacklist.findMany({
      select: {
        id: true,
        phone: true,
        reason: true,
      },
      orderBy: {
        id: "desc"
      }
    });

    return NextResponse.json<GetBlacklistSuccessResponse>(blacklist, {
      status: STATUS_OK,
    });
  } catch (error) {
    console.error("Error getting blacklist:", error);
    return apiErrorResponse("Couln't get blacklist");
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const body: PostBlacklistRequestPayload = await req.json();

    const schema = Joi.object<PostBlacklistRequestPayload>({
      phone: Joi.string().regex(phoneRegex).required(),
      reason: Joi.string().min(5).max(255).allow("").optional(),
    });

    const { error, value: data } = schema.validate(body);

    if (error || !data) {
      return apiErrorResponse(
        "Validation error: Invalid request",
        STATUS_BAD_REQUEST
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    // if (!user) {
    //   return apiErrorResponse("user not found", STATUS_NOT_FOUND);
    // }

    await prisma.blacklist.create({
      data: {
        userPhone: user ? user.phone : undefined,
        phone: data.phone,
        reason: !data.reason ? undefined : data.reason,
      },
    });

    return NextResponse.json({ status: STATUS_CREATED });
  } catch (error) {
    console.error("Error blocking phone number:", error);
    return apiErrorResponse("Couln't block phone number");
  }
}
