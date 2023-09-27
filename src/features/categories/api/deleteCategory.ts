import { CategoryType } from "@/store/dashboardSlice";
import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

type DeleteCategoryFnArgs = {
  code: string;
  type: CategoryType;
};

/**
 * Delete request for categories and subcategories api routes
 * @param code The resource code
 * @param type This affects the api route endpoint. either categories or subcategories
 * @returns the code and category type that were provided
 */
export const deleteCategory = async ({
  type,
  code,
}: DeleteCategoryFnArgs): Promise<DeleteCategoryFnArgs> => {
  await ky
    .delete(
      `/api/${type === "category" ? "categories" : "subcategories"}/${code}`,
    )
    .json();
  return { code, type };
};

type UseDeleteCategoryOptions = MutationOptions<
  DeleteCategoryFnArgs,
  DeleteCategoryFnArgs
>;
export const useDeleteCategory = (options: UseDeleteCategoryOptions) => {
  return useMutation({
    mutationFn: deleteCategory,
    ...options,
  });
};
