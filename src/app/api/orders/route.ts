import { apiErrorResponse, uniqueId } from './../../../lib/utils';
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { ORDER_CODE_LENGTH, STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_OK, STATUS_UNAUTHORIZED } from "@/lib/constants";
import { GetAllOrdersSuccessResponsePayload, PostOrderRequestPayload } from '@/types/api';
import Joi from 'joi';
import { emailRegex, phoneRegex } from '@/lib/formValidators';
import { prisma } from '../../../../prisma/db';


// TODO: Implement Rate limiting for all API routes

export async function POST(req: NextRequest) {

  try {

    const body: PostOrderRequestPayload = await req.json();

    const schema = Joi.object<PostOrderRequestPayload>({
      phone: Joi.string().regex(phoneRegex).required(),
      isHome: Joi.boolean().strict().required(),
      address: Joi.string().when("isHome", { is: true, then: Joi.required(), otherwise: Joi.optional().empty() }).min(10).max(200),
      lastName: Joi.string().min(3).max(40).optional(),
      name: Joi.string().min(3).max(40).optional(),
      email: Joi.string().regex(emailRegex).optional(),
      wilayaId: Joi.number().strict().min(1).max(58).required(),
      townCode: Joi.number().strict().min(1001).max(58003).required(),
      productsCode: Joi.array().min(1).max(3).items(Joi.string().regex(/^[a-zA-Z0-9]{20}$/)),
    });

    const validation = schema.validate(body);
    if (validation.error || !validation.value) {
      console.error("Failed request data => ", body);
      console.error("Logged error message => ", validation.error)
      return apiErrorResponse("Validation error: Invalid request", STATUS_BAD_REQUEST)
    }

    // validated data
    const data = validation.value;
    const { isHome, phone, productsCode, wilayaId, address, lastName, name, email, townCode } = data;

    // check if the products exist
    // remove potential array duplicates
    const productsCodeNoDup = Array.from(new Set(productsCode))

    const productsExist = await prisma.product.count({
      where: {
        code: {
          in: productsCodeNoDup
        }
      }
    })

    if (productsExist !== productsCodeNoDup.length) {
      return apiErrorResponse("invalid product codes", STATUS_BAD_REQUEST)
    }

    // check if the user exists before creating one
    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone
      }
    });


    const orderCode = uniqueId(ORDER_CODE_LENGTH, true)

    // if there are no user with this phone number, create one
    await prisma.order.create({
      data: {
        code: orderCode,
        isHome,
        address,
        wilaya: {
          connect: {
            id: wilayaId
          }
        },
        town: {
          connect: {
            code: townCode
          }
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
                connect: { id: wilayaId }
              },
            }
          })
        },
        orderProducts: {
          createMany: {
            // allow duplicates if the user wants to order the same product twice or more
            data: productsCode.map(code => ({ productCode: code }))
          }
        }
      },
      include: {
        user: true,
        wilaya: true,
        orderProducts: true
      }
    })

    return NextResponse.json({ orderCode }, { status: STATUS_CREATED })
  } catch (error) {
    console.error("Error creating order", error)
    return apiErrorResponse("Global error creating order")
  }

}


export async function GET(_: NextRequest, { params }: { params: { page: number } }) {

  // const { page } = params

  try {
    if (!await isAdmin()) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }
    const orders: GetAllOrdersSuccessResponsePayload[] = await prisma.order.findMany({
      select: {
        address: true,
        code: true,
        isHome: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            phone: true,
          }
        },
        wilaya: {
          select: {
            name: true,
            arName: true,
            code: true,
            homePrice: true,
            officePrice: true
          }
        },
        town: {
          select: {
            code: true,
            arName: true,
            name: true
          }
        },
        orderProducts: {
          select: {
            product: {
              select: {
                name: true,
                price: true,
                discount: true,
              }
            }
          }
        }
      },
      take: 10,

    })

    return NextResponse.json(orders, { status: STATUS_OK })
  } catch (error) {
    console.error("Error getting orders from database:", error)
    return apiErrorResponse("Couln't retrieve orders")
  }
}
