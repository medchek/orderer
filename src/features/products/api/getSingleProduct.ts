import ky from "ky";
import { QueryOptions } from "@/types/api";
import { Product } from "../types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Fetch a single product from the api
 * @param queryKey React query keys array where the second array item is the product code
 * @returns fetched product data
 */
export const getSingleProduct = async (
  productCode: string,
): Promise<Product> => {
  if (!productCode) throw "No product code";
  return await ky.get(`/api/products/${productCode}`).json();

};

type UseGetSingleProductQueryOptions = QueryOptions<Product>;

export const useGetSingleProduct = (
  productCode: string,
  opts?: UseGetSingleProductQueryOptions,
) => {
  return useQuery({
    queryKey: queryKeys.products.one(productCode).queryKey,
    queryFn: () => getSingleProduct(productCode),
    ...opts,
  });
};
