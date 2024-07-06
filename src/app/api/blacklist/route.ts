import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

import Joi from "joi";

import { apiErrorResponse, uniqueId } from "@/lib/utils";
import {
  PHONE_ENTRY_ID_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { prisma } from "../../../../prisma/db";
import { GetBlacklistSuccessResponse } from "@/features/blacklist/api/getBlacklist";
import { PostBlacklistRequestPayload } from "@/features/blacklist/api/postBlacklist";
import { phoneRegex } from "@/lib/patterns";

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const blacklist = await prisma.phone.findMany({
      select: {
        id: true,
        phone: true,
        blacklistReason: true,
      },
      where: {
        isBlacklisted: {
          equals: true,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
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
        STATUS_BAD_REQUEST,
      );
    }

    await prisma.phone.upsert({
      create: {
        id: uniqueId(PHONE_ENTRY_ID_LENGTH),
        phone: data.phone,
        blacklistReason: data.reason,
        isBlacklisted: true,
      },
      update: {
        blacklistReason: data.reason,
        isBlacklisted: true,
      },
      where: {
        phone: data.phone,
      },
    });

    return NextResponse.json({ status: STATUS_CREATED });
  } catch (error) {
    console.error("Error blocking phone number:", error);
    return apiErrorResponse("Couln't block phone number");
  }
}
