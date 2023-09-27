import { queryKeys } from "@/lib/queryKeys";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import ky from "ky";

export type GetCategoriesSuccessResponse = {
  code: string;
  name: string;
  subCategories?: { code: string; name: string }[];
}[];
/**
 * Fetch all the categories from the api
 * @returns the list of categories and their sub-categories
 */
export const getCategories =
  async (): Promise<GetCategoriesSuccessResponse> => {
    return await ky.get("/api/categories").json();
  };

type UseGetCategoriesOptions = UseQueryOptions<GetCategoriesSuccessResponse>;

export const useGetCategories = (options?: UseGetCategoriesOptions) => {
  return useQuery({
    queryKey: queryKeys.categories.all.queryKey,
    queryFn: getCategories,
    ...options,
  });
};
