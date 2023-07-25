import { apiErrorResponse, uniqueId } from './../../../lib/utils';
import { NextRequest, NextResponse } from "next/server";
import { isAdmin as isAdministrator } from "../auth/[...nextauth]/route";
import { STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_OK, STATUS_UNAUTHORIZED } from "@/lib/constants";
import { PostOrderRequestPayload } from '@/types/api';
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
    const { isHome, phone, productsCode, wilayaId, address, lastName, name, email } = data;

    // check if the products exist

    const productsExist = await prisma.product.count({
      where: {
        code: {
          in: productsCode
        }
      }
    })

    if (productsExist !== productsCode.length) {
      return apiErrorResponse("invalid product codes", STATUS_BAD_REQUEST)
    }

    // check if the user exists before creating one
    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone
      }
    });


    const orderCode = uniqueId(14, true)

    // if there are no user with this phone number, create one
    const order = await prisma.order.create({
      data: {
        code: orderCode,
        isHome,
        address,
        wilaya: {
          connect: {
            id: wilayaId
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

    return apiErrorResponse("Global error creating order")
  }

}
