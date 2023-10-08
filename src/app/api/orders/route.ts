import {
  apiErrorResponse,
  toPositiveNumber,
  uniqueId,
} from "./../../../lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import {
  ORDER_CODE_LENGTH,
  SHIPPING_LOCATION_ID_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/lib/constants";

import Joi from "joi";

import { prisma } from "../../../../prisma/db";
import { Prisma, Status } from "@prisma/client";
import {
  PostOrderRequestPayload,
  PostOrderSuccessResponse,
} from "@/features/orders/api/postOrder";
import { GetOrdersSuccessResponse } from "@/features/orders/api/getOrders";
import { emailRegex, phoneRegex } from "@/lib/patterns";
import { headers } from "next/headers";
import { verifyCaptcha } from "@/features/recaptcha/api/verifyCaptcha";

// TODO: Implement Rate limiting for all API routes

export async function POST(req: NextRequest) {
  try {
    // verify captcha
    const headersList = headers();

    const recaptchaToken = headersList.get("X-Recaptcha-Token");

    const isValidRecaptchaToken = await verifyCaptcha(recaptchaToken);

    if (!isValidRecaptchaToken.success) {
      return apiErrorResponse(
        "Authorization error: Invalid captcha token",
        STATUS_UNAUTHORIZED,
      );
    }

    const body: PostOrderRequestPayload = await req.json();

    const schema = Joi.object<PostOrderRequestPayload>({
      phone: Joi.string().regex(phoneRegex).required(),
      isHome: Joi.boolean().strict().required(),
      address: Joi.string()
        .when("isHome", {
          is: true,
          then: Joi.string().max(150).required(),
          otherwise: Joi.optional().empty(),
        })
        .min(10)
        .max(200),
      locationId: Joi.string().when("isHome", {
        is: false,
        then: Joi.string()
          .length(SHIPPING_LOCATION_ID_LENGTH)
          .allow("")
          .required(),
        otherwise: Joi.optional().empty(),
      }),
      lastName: Joi.string().min(3).max(40).optional(),
      name: Joi.string().min(3).max(40).optional(),
      email: Joi.string().regex(emailRegex).optional(),
      wilayaId: Joi.number().strict().min(1).max(58).required(),
      townCode: Joi.number().strict().min(1001).max(58003).required(),
      productsCode: Joi.array()
        .min(1)
        .max(3)
        .items(Joi.string().regex(/^[a-zA-Z0-9]{20}$/)),
    });

    const validation = schema.validate(body);
    if (validation.error || !validation.value) {
      console.error("Failed request data => ", body);
      console.error("Logged error message => ", validation.error);
      return apiErrorResponse(
        "Validation error: Invalid request",
        STATUS_BAD_REQUEST,
      );
    }

    // validated data
    const data = validation.value;
    const {
      isHome,
      phone,
      productsCode,
      wilayaId,
      address,
      lastName,
      name,
      email,
      townCode,
      locationId,
    } = data;

    // check if the products exist
    // remove potential array duplicates
    const productsCodeNoDup = Array.from(new Set(productsCode));

    const productsExist = await prisma.product.count({
      where: {
        code: {
          in: productsCodeNoDup,
        },
      },
    });

    if (productsExist !== productsCodeNoDup.length) {
      return apiErrorResponse("invalid product codes", STATUS_BAD_REQUEST);
    }

    // check if the user exists before creating one
    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    const orderCode = uniqueId(ORDER_CODE_LENGTH, true);

    // if there are no user with this phone number, create one
    await prisma.order.create({
      data: {
        code: orderCode,
        isHome,
        address,
        wilaya: {
          connect: {
            id: wilayaId,
          },
        },
        town: {
          connect: {
            code: townCode,
          },
        },
        user: {
          ...(user && { connect: { id: user.id } }),
          ...(!user && {
            create: {
              phone,
              address: isHome ? address : undefined,
              name,
              email,
              lastName,
              wilaya: {
                connect: { id: wilayaId },
              },
            },
          }),
        },
        location: {
          connect: {
            id: locationId && locationId.length > 0 ? locationId : undefined,
          },
        },
        orderProducts: {
          createMany: {
            // allow duplicates if the user wants to order the same product twice or more
            data: productsCode.map((code) => ({ productCode: code })),
          },
        },
      },
      // include: {
      //   user: true,
      //   wilaya: true,
      //   orderProducts: true,
      // },
    });

    return NextResponse.json<PostOrderSuccessResponse>(
      { orderCode },
      { status: STATUS_CREATED },
    );
  } catch (error) {
    console.error("Error creating order", error);
    return apiErrorResponse("Global error creating order");
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const pageString = req.nextUrl.searchParams.get("page");

    const page = pageString ? toPositiveNumber(pageString) : 0;
    // edge case when the user sends a <= 0 page number
    const currentPage = page > 0 ? page : 0;
    const ordersPerPage = 10;

    /** FILTERS */

    // status
    const statusFilterParam = req.nextUrl.searchParams.get("status");
    const statusList = new Set<Status>([
      "UNCONFIRMED",
      "CONFIRMED",
      "SHIPPING",
      "SUCCESS",
      "CANCELED",
      "RETURNED",
    ]);
    const statusFilter: Status | undefined =
      // the has() Set method asserts that filterByStatus is one of the allowed status string
      statusFilterParam && statusList.has(statusFilterParam as Status)
        ? (statusFilterParam as Status)
        : undefined;
    // wilaya
    const wilayaFilterParam = toPositiveNumber(
      req.nextUrl.searchParams.get("wilaya") ?? "0",
    );
    const wilayaCodeFilter =
      wilayaFilterParam <= 0 || wilayaFilterParam > 58
        ? undefined
        : wilayaFilterParam;

    // shippingType
    const shippyingTypeFilterParam =
      req.nextUrl.searchParams.get("shippingType");
    const shippyingTypeFilter =
      shippyingTypeFilterParam === "home"
        ? true
        : shippyingTypeFilterParam === "office"
        ? false
        : undefined;
    // phone
    const phoneFilterParam = req.nextUrl.searchParams.get("phone");
    const phoneFilter =
      !phoneFilterParam || !/^0[756]{1}[0-9]{1,8}$/i.test(phoneFilterParam)
        ? undefined
        : phoneFilterParam;
    // code
    const codeFilterParam = req.nextUrl.searchParams.get("code");
    const codeFilter =
      !codeFilterParam || codeFilterParam.length > ORDER_CODE_LENGTH
        ? undefined
        : codeFilterParam;

    const conditions: Prisma.OrderFindManyArgs | Prisma.OrderCountArgs = {
      where: {
        status: statusFilter,
        code: codeFilter,
        user: {
          phone: {
            startsWith: phoneFilter,
          },
        },
        wilaya: {
          code: wilayaCodeFilter,
        },
        isHome: shippyingTypeFilter,
      },
    };

    const orders = await prisma.$transaction([
      prisma.order.count({
        where: conditions.where,
      }),
      prisma.order.findMany({
        select: {
          address: true,
          code: true,
          isHome: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              phone: true,
              blacklist: {
                select: {
                  reason: true,
                  phone: true,
                },
              },
            },
          },
          wilaya: {
            select: {
              name: true,
              arName: true,
              code: true,
              homePrice: true,
              officePrice: true,
            },
          },
          town: {
            select: {
              code: true,
              arName: true,
              name: true,
            },
          },
          orderProducts: {
            select: {
              product: {
                select: {
                  name: true,
                  price: true,
                  discount: true,
                },
              },
            },
          },
        },
        take: ordersPerPage,
        skip: currentPage * ordersPerPage,
        where: conditions.where,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json<GetOrdersSuccessResponse>(
      {
        count: orders[0],
        data: orders[1],
      },
      {
        status: STATUS_OK,
      },
    );
  } catch (error) {
    console.error("Error getting orders from database:", error);
    return apiErrorResponse("Couln't retrieve orders");
  }
}
