import { Status } from "@prisma/client";
import ky from "ky";
import { OrderData } from "../types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export type GetOrdersQueryFilter = {
  currentPage: number;
  status?: Status | "";
  wilaya?: string;
  shippingType?: string;
  phone?: string;
  code?: string;
};

export interface GetOrdersSuccessResponse {
  count: number;
  data: OrderData[];
}

/**
 * fetch orders from the api
 * @param filter query filter
 * @returns paginated/fitered orders list
 */
export const getOrders = async (
  filter: GetOrdersQueryFilter,
): Promise<GetOrdersSuccessResponse> => {
  const { currentPage, ...queryFilters } = filter;
  const filterParams = Object.entries(queryFilters)
    // filter out any value that is empty
    .filter(([_, value]) => !!value)
    // join key value pairs by = which results in an array of string url params
    .map((rule) => rule.join("="))
    // join all params by &
    .join("&");

  return await ky
    .get(
      `/api/orders?page=${currentPage}` +
        (filterParams.length ? `&${filterParams}` : ""),
    )
    .json();
};

type UseFetchOrdersOptions = {
  /** Query Filters */
  filters: GetOrdersQueryFilter;
  /** Query options */
  config?: UseQueryOptions<GetOrdersSuccessResponse>;
};

export const useGetOrders = ({ filters, config }: UseFetchOrdersOptions) => {
  return useQuery({
    queryKey: queryKeys.orders.all(filters).queryKey,
    queryFn: () => getOrders(filters),
    placeholderData: (prevData) => prevData,
    retryDelay: 2000,
    gcTime: 1000 * 60 * 10,
    ...config,
  });
};
