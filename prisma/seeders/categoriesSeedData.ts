import { Prisma } from "@prisma/client";

export const dummyCategoriesdata: Prisma.CategoryUncheckedCreateInput[] = [
  {
    name: "ordinateurs",
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
  },
  {
    name: "téléviseurs",
  },
  {
    name: "nourriture",
  },
  {
    name: "meubles",
  },
  {
    name: "consmétiques",
  },
  {
    name: "utilitaires",
  },
  {
    name: "méchaniques",
  },

]