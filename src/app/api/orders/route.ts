import {
  apiErrorResponse,
  toPositiveNumber,
  uniqueId,
} from "./../../../lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getSession, isAdmin } from "../auth/[...nextauth]/route";
import {
  MAX_PRODUCT_QUANTITY,
  ORDER_CODE_LENGTH,
  PHONE_ENTRY_ID_LENGTH,
  SHIPPING_LOCATION_ID_LENGTH,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
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
import { emailRegex, phoneRegex, productCodeRegex } from "@/lib/patterns";
// import { headers } from "next/headers";
// import { verifyCaptcha } from "@/features/recaptcha/api/verifyCaptcha";
import { notifyOrderCreated } from "@/features/notifications/api/notifyOrderCreated";
import { verifyCaptcha } from "@/features/recaptcha/api/verifyCaptcha";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // verify captcha

    const headersList = await headers();

    const recaptchaToken = headersList.get("X-Recaptcha-Token");

    const isValidRecaptchaToken = await verifyCaptcha(recaptchaToken);

    if (!isValidRecaptchaToken.success) {
      return apiErrorResponse(
        "Authorization error: Invalid captcha token",
        STATUS_UNAUTHORIZED,
      );
    }

    const body: PostOrderRequestPayload = await req.json();

    const productsSchema = Joi.object<
      PostOrderRequestPayload["products"]
    >().pattern(
      // key
      Joi.string().regex(productCodeRegex),
      // value
      Joi.object({
        quantity: Joi.number()
          .strict()
          .positive()
          .precision(0)
          .min(1)
          .max(MAX_PRODUCT_QUANTITY)
          .required(),
      }),
    );

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
        then: Joi.string().length(SHIPPING_LOCATION_ID_LENGTH),
        otherwise: Joi.optional().empty(),
      }),
      lastName: Joi.string().min(3).max(40),
      name: Joi.string().min(3).max(40),
      email: Joi.string().regex(emailRegex).optional(),
      wilayaCode: Joi.number().strict().min(1).max(58).required(),
      townCode: Joi.number().strict().min(1001).max(58003).required(),
      products: productsSchema,
      // products: Joi.array().min(1).max(3).items(productsSchema).required(),
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

    /** Validated data */
    const data = validation.value;
    const {
      isHome,
      phone,
      products,
      wilayaCode,
      address,
      name,
      townCode,
      locationId,
    } = data;

    const productsCode = Object.keys(products);

    /**
     * Products data from Db, required to calculate prices
     */
    const selectedProducts = await prisma.product.findMany({
      where: {
        code: {
          in: productsCode,
        },
      },
    });

    if (selectedProducts.length !== productsCode.length) {
      return apiErrorResponse("invalid product codes", STATUS_BAD_REQUEST);
    }

    const orderCode = uniqueId(ORDER_CODE_LENGTH, true);

    // Shipping prices can always change, thus, we need to calculate the total shipping price relative to the order at the current time keeping therefore the prices in the order history accurate

    let shippingPrice = 0;

    const wilayaData = await prisma.wilaya.findUnique({
      where: {
        code: wilayaCode,
      },
    });

    if (!wilayaData) {
      return apiErrorResponse("invalid wilaya code", STATUS_NOT_FOUND);
    }

    // calculating shipping and products (including diccount) price
    if (isHome) {
      shippingPrice = wilayaData.homePrice;
    } else {
      shippingPrice = wilayaData.officePrice;
      if (locationId) {
        const locationData = await prisma.locations.findUnique({
          where: {
            id: locationId,
          },
        });
        if (!locationData) {
          return apiErrorResponse("invalid location id", STATUS_NOT_FOUND);
        }

        if (locationData.additionalCosts && locationData.additionalCosts > 0) {
          shippingPrice += locationData.additionalCosts;
        }
      }
    }

    const session = await getSession();

    /**
     * Create a phone entry in the phone table if it doesn't exist
     */
    const createdPhone = await prisma.phone.upsert({
      create: {
        id: uniqueId(PHONE_ENTRY_ID_LENGTH),
        phone,

        ...(session?.user?.id && {
          user: {
            connect: {
              id: session.user.id,
            },
          },
        }),
      },
      update: {},
      where: { phone },
    });

    // prepare orderProducts data

    const orderProductsData: Prisma.OrdersProductsCreateManyOrderInput[] =
      productsCode.map((code) => {
        // extract required info from the db returned products data
        const productData = selectedProducts.find(({ code }) => code === code);

        return {
          productCode: code,
          price: productData?.price ?? 0,
          discount: productData?.discount,
          quantity: products[code].quantity,
        };
      });

    // update the user information
    if (session && session.user) {
      // update the logged in user
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name,
          wilayaCode,
          townCode,
          phone,
          address,
        },
      });
    }

    // if there are no user with this phone number, create one
    const createdOrder = await prisma.order.create({
      data: {
        code: orderCode,
        shippingPrice,
        isHome,
        address,
        phone: {
          connect: {
            phone: createdPhone.phone,
          },
        },
        wilaya: {
          connect: {
            code: wilayaCode,
          },
        },
        town: {
          connect: {
            code: townCode,
          },
        },
        ...(session?.user?.id && {
          user: {
            connect: {
              id: session.user.id,
            },
          },
        }),
        location: {
          connect:
            locationId && locationId.length > 0
              ? {
                  id: locationId,
                }
              : undefined,
        },
        orderProducts: {
          createMany: {
            // allow duplicates if the user wants to order the same product twice or more
            // also, calculate each product price at the time of the order since it can always change
            data: orderProductsData,
          },
        },
      },

      select: {
        createdAt: true,
        town: {
          select: {
            name: true,
          },
        },
        wilaya: {
          select: {
            name: true,
          },
        },
        orderProducts: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // await sendOrderCreatedEmail({
    //   createdAt: formatDate(createdOrder.createdAt, {
    //     addPreposition: true,
    //   }),
    //   orderCode,
    //   phone,
    //   town: createdOrder.town.name,
    //   wilaya: createdOrder.wilaya.name,
    //   products: createdOrder.orderProducts.map(
    //     (product) => product.product.name,
    //   ),
    // });

    await notifyOrderCreated({
      orderCode,
      phone,
      town: createdOrder.town.name,
      wilaya: createdOrder.wilaya.name,
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
        phone: {
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
          location: {
            select: {
              additionalCosts: true,
              name: true,
            },
          },
          phone: {
            select: {
              isBlacklisted: true,
              blacklistReason: true,
              phone: true,
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
              price: true,
              discount: true,
              quantity: true,
              product: {
                select: {
                  name: true,
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
