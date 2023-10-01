// import { PRODUCT_CODE_LENGTH } from "../../src/lib/constants";
// import { uniqueId } from "@/lib/utils";
import { Prisma } from "@prisma/client";

// 1aF8dEnx-7d3oAuJ5j1SNhe4xwnl2b5D2 : air max 95
// 1DsWxW2uZcK5shlI_QI7fL5HI0q_pJaTJ : power bank

// static products codes are used to seed dummy orders
const productCodes = [
  "vvXh0TgpuWi48ilBKJr4",
  "bq6ucPgr5bGASEhbJoy1",
  "pE4XqhRMls7w9X0gZo7T",
  "oNMzRxP2HyatmO6FYTIO",
];

export const dummyProductData: Prisma.ProductUncheckedCreateInput[] = [
  {
    code: productCodes[0],
    name: "Apple Watch Series 8 Gps + Cellular 45mm",
    description: "Couleur: Midnight",
    price: 5000,
    stock: 3,
    discount: 10,
    images: {
      create: [
        {
          // id: "1WhKFUcpnBl8MqaSpcw70NSoZeSBtz5ef",
          id: "orderer/iz5r4cmm8klezd5jan8t",
        },
      ],
    },
  },
  {
    code: productCodes[1],
    name: "Air max 97 Leather",
    description: "Couleur: Midnight. Cuire",
    price: 27000,
    stock: 2,
    discount: 0,
    images: {
      create: [
        {
          // id: "1JiSH9SjDewPciUQvTOqqD72bRn3qDhNY",
          id: "orderer/dfgdy8fu05p4hzwytp2e",
        },
        {
          // id: "1_fidORk6K4OW5Swj36HXsZh8Lpsa5YZn"
          id: "orderer/ywhi4dzu6pfkavedic8o",
        },
      ],
    },
  },
  {
    code: productCodes[2],
    name: "Samsung Powerbank 10000mah",
    description: "Couleur: Black",
    price: 22000,
    stock: 1,
    discount: 0,
    images: {
      create: [
        {
          // id: "1DsWxW2uZcK5shlI_QI7fL5HI0q_pJaTJ",
          id: "orderer/wiiaudlaq0arjsqnkyr9",
        },
      ],
    },
  },

  {
    code: productCodes[3],
    name: "Samsung Ear bud 2 Pro",
    description: "Couleur: Black",
    price: 6000,
    stock: 1,
    discount: 0,
    images: {
      create: [
        {
          // id: "1wPO_70ZdPA5VPIy2eLl068onrwxvDvZI",
          id: "orderer/o0njk8ffbapfttmugvao",
        },
      ],
    },
  },
];

// export const dummyOrdersData: Prisma.OrderUncheckedCreateInput[] = [
//   {
//     code: uniqueId(ORDER_CODE_LENGTH, true),
//     wilayaId: 17,
//     isHome: false,orderProducts: {
//       connect: {productCode: productCodes[0]},

//     }

//   }
// ]
