import ky from "ky";
import { Product } from "../types";
import { QueryOptions } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export interface GetProductsSuccessResponse {
  count: number;
  products: Product[];
}

/**
 * fetche all the products from the api
 * @returns all products data
 */
export const getProducts = async (): Promise<GetProductsSuccessResponse> => {
  return await ky.get("/api/products").json();
};

type UseGetProductsQueryOptions = QueryOptions<GetProductsSuccessResponse>;

export const useGetProducts = (opts?: UseGetProductsQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.products.all.queryKey,
    queryFn: getProducts,
    ...opts,
  });
};
