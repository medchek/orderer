import { GetOrdersQueryFilter } from "@/features/orders/api/getOrders";
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
    all: null,
    one: (code: string) => ({
      queryKey: [code],
    }),
  },
  images: {
    all: null,
  },
});
