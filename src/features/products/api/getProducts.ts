import ky from "ky";
import { Product, ProductsFilters } from "../types";
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
export const getProducts = async (
  filters: ProductsFilters,
): Promise<GetProductsSuccessResponse> => {
  const { currentPage, ...queryFilters } = filters;
  const filterParams = Object.entries(queryFilters)
    // filter out any value that is empty
    .filter(([_, value]) => !!value)
    // join key value pairs by = which results in an array of string url params
    .map((rule) => rule.join("="))
    // join all params by &
    .join("&");
  return await ky
    .get(
      `/api/products?page=${currentPage}` +
        (filterParams.length > 0 ? `&${filterParams}` : ""),
    )
    .json();
};

type UseGetProductsQueryOptions = QueryOptions<GetProductsSuccessResponse>;

export const useGetProducts = (
  filters: ProductsFilters,
  opts?: UseGetProductsQueryOptions,
) => {
  return useQuery({
    queryKey: queryKeys.products.all(filters).queryKey,
    queryFn: () => getProducts(filters),

    ...opts,
  });
};
