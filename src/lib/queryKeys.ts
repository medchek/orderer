import { GetOrdersQueryFilter } from "@/features/orders/api/getOrders";
import { ProductsFilters as GetProductsQueryFilter } from "@/features/products/types";
import { ShippingLocationsQueryFilter } from "@/features/shipping-locations/api/getLocations";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeyStore({
  orders: {
    all: (filters: GetOrdersQueryFilter) => ({
      queryKey: [{ filters }],
    }),
  },
  wilayas: {
    all: null,
  },
  towns: {
    list: (wilayaCode: number) => ({ queryKey: [wilayaCode] }),
  },
  blacklist: {
    all: null,
  },
  categories: {
    all: null,
  },
  products: {
    all: (filters: GetProductsQueryFilter) => ({
      queryKey: [{ filters }],
    }),
    one: (code: string) => ({
      queryKey: [code],
    }),
  },
  locations: {
    all: (filters: ShippingLocationsQueryFilter) => ({
      queryKey: [{ filters }],
    }),
    wilayaSpecific: (wilayaCode: number) => ({
      queryKey: [{ wilayaCode }],
    }),
  },
  account: {
    currentSession: null,
  },
  images: {
    all: null,
  },
});
