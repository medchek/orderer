import { CategoryType } from "@/store/dashboardSlice";
import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

type DeleteCategoryFnArgs = {
  id: number;
  type: CategoryType;
};

/**
 * Delete request for categories and subcategories api routes
 * @param id The resource id
 * @param type This affects the api route endpoint. either categories or subcategories
 * @returns the id and category type that were provided
 */
export const deleteCategory = async ({
  type,
  id,
}: DeleteCategoryFnArgs): Promise<DeleteCategoryFnArgs> => {
  await ky
    .delete(
      `/api/${type === "category" ? "categories" : "subcategories"}/${id}`,
    )
    .json();
  return { id, type };
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
