import { SHIPPING_LOCATION_ID_LENGTH } from "@/lib/constants";
import { uniqueId } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const dummyLocationsData: Prisma.LocationsUncheckedCreateInput[] = [
  {
    id: uniqueId(SHIPPING_LOCATION_ID_LENGTH),
    name: "DHL Hussein Dey",
    townCode: 16017,
    wilayaCode: 16,
    additionalCosts: 100,
  },
  {
    id: uniqueId(SHIPPING_LOCATION_ID_LENGTH),
    name: "DHL Gué de Constantine",
    townCode: 16026,
    wilayaCode: 16,
  },
  {
    id: uniqueId(SHIPPING_LOCATION_ID_LENGTH),
    name: "DHL Express Bachdjerrah",
    townCode: 16016,
    wilayaCode: 16,
    additionalCosts: 200,
  },
  {
    id: uniqueId(SHIPPING_LOCATION_ID_LENGTH),
    name: "DHL Baraki",
    townCode: 16014,
    wilayaCode: 16,
  },
  {
    id: uniqueId(SHIPPING_LOCATION_ID_LENGTH),
    name: "DHL Touggourt Ville",
    townCode: 55012,
    wilayaCode: 55,
    additionalCosts: 100,
  },
];
