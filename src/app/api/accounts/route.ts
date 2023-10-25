import { NextRequest, NextResponse } from "next/server";

import { apiErrorResponse, verifyTownCode } from "@/lib/utils";
import {
  STATUS_BAD_REQUEST,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";
import { PatchAccountPayload } from "@/features/settings/api/patchAccount";
import Joi, { CustomHelpers } from "joi";
import { phoneRegex } from "@/lib/patterns";
import { prisma } from "../../../../prisma/db";
import { GetAccountResponse } from "@/features/settings/api/getAccount";
import { getSession } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return apiErrorResponse("Not logged", STATUS_UNAUTHORIZED);
    }

    const dbUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      select: {
        address: true,
        name: true,
        phone: true,
        wilayaCode: true,
        townCode: true,
      },
    });
    const user: GetAccountResponse = {
      address: dbUser?.address ?? null,
      fullName: dbUser?.name ?? null,
      phone: dbUser?.phone ?? null,
      wilaya: dbUser?.wilayaCode ?? null,
      town: dbUser?.townCode ?? null,
    };

    return NextResponse.json<GetAccountResponse>(user, { status: STATUS_OK });
  } catch (error) {
    console.error("Error getting account detail:", error);
    return apiErrorResponse("Could not fetch account detail");
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return apiErrorResponse("Not logged", STATUS_UNAUTHORIZED);
    }

    const body: PatchAccountPayload = await req.json();

    const schema = Joi.object<PatchAccountPayload>({
      address: Joi.string().min(10).max(150),
      fullName: Joi.string().min(2).max(150),
      phone: Joi.string().regex(phoneRegex),
      wilaya: Joi.number()
        .strict()
        .positive()
        .min(1)
        .max(58)
        .when(Joi.ref("town"), {
          is: Joi.number().strict().positive().exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
      town: Joi.number()
        .strict()
        .positive()
        .min(1001)
        .max(58050)
        .custom((value: number | undefined, helpers: CustomHelpers<number>) => {
          // if value is empty, dont process anything
          if (!value) return value;
          // check the wilaya code ref
          const wilayaCode = helpers.state.ancestors[0].wilaya;

          if (!wilayaCode || typeof wilayaCode !== "number") {
            return helpers.message({ custom: "Wilaya code must be set" });
          }

          const isValid = verifyTownCode(value, wilayaCode);

          if (!isValid)
            return helpers.message({
              custom: "town code does not belong to wilaya",
            });

          return value;
        }),
    });

    const validation = schema.validate(body);

    if (validation.error || !validation.value) {
      console.log("validationError:", validation.error);
      return apiErrorResponse("Invalid request", STATUS_BAD_REQUEST);
    }

    const {
      address,
      fullName,
      phone,
      town: townCode,
      wilaya: wilayaCode,
    } = validation.value;

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        address,
        name: fullName,
        phone,
        wilayaCode,
        townCode,
      },
    });

    return NextResponse.json("ok", { status: STATUS_OK });
  } catch (error) {
    console.error("Error patching account detail:", error);
    return apiErrorResponse("Could not patch account");
  }
}
