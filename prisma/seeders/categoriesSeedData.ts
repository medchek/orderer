import { CATEGORY_CODE_LENGTH } from "../../src/lib/constants";
import { uniqueId } from "../../src/lib/utils";
import { Prisma } from "@prisma/client";

export const dummyCategoriesdata: Prisma.CategoryUncheckedCreateInput[] = [
  {
    name: "ordinateurs",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    nameLowercase: "ordinateurs",
    // subCategories: {
    //   create: [{
    //     name: "PC portables"
    //   }, {
    //     name: "Pc fixes"
    //   }, {
    //     name: "composants"
    //   }]
    // }
  },
  {
    name: "téléphones",
    nameLowercase: "téléphones",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    // subCategories: {
    //   create: [
    //     { name: "Apple" },
    //     { name: "Samsung" },
    //     { name: "Oppo" },
    //   ]
    // }
  },
  {
    name: "vêtements",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    nameLowercase: "vêtements",
    // subCategories: {
    //   create: [
    //     { name: "T-Shirts" },
    //     { name: "Baskets" },
    //     { name: "Pantalons" },
    //   ]
    // }
  },
  {
    name: "bijoux",
    nameLowercase: "bijoux",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    // subCategories: {
    //   create: [
    //     { name: "Diamants" },
    //     { name: "Emeraude" },
    //     { name: "Saphire" },
    //     { name: "Fantaisie" },
    //   ]
    // }
  },
  {
    name: "machines",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    nameLowercase: "machines",
  },
  {
    name: "téléviseurs",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    nameLowercase: "téléviseurs",
  },
  {
    name: "nourriture",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    nameLowercase: "nourriture",
  },
  {
    name: "meubles",
    code: uniqueId(CATEGORY_CODE_LENGTH),
    nameLowercase: "meubles",
  },
  {
    name: "consmétiques",
    nameLowercase: "consmétiques",
    code: uniqueId(CATEGORY_CODE_LENGTH),
  },
  {
    name: "utilitaires",
    nameLowercase: "utilitaires",
    code: uniqueId(CATEGORY_CODE_LENGTH),
  },
  {
    name: "méchaniques",
    nameLowercase: "méchaniques",
    code: uniqueId(CATEGORY_CODE_LENGTH),
  },
];
