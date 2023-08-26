import { Status } from "@prisma/client";

export type GetOrdersQueryFilter = {
  status?: Status | "";
  wilaya?: string;
  shippingType?: string;
  phone?: string;
  code?: string;
};

/**
 * Query key for fetching the orders
 * @param currentPage the current pagination page
 * @param queryFilter any filters to the query
 * @returns query key array
 */
export const fetchOrdersQueryKey = (
  currentPage: number,
  queryFilter: GetOrdersQueryFilter
): [string, number, GetOrdersQueryFilter] => [
  "orders",
  currentPage,
  queryFilter,
];

/**
 * Query key for fetching all the wilayas
 * @returns query key array
 */
export const fetchWilayaQueryKey = ["wilayas"] as const;


/**
 * Query key for patch wilaya shipping prices and shipping availablity mutation
 */
export const patchWilayaMutationKey = ["wilayas", "patch"] as const;
