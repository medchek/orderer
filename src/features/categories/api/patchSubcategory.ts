import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

export interface PatchSubcategorySuccessResponse {
  id: number;
  /** Parent category id */
  categoryId: number;
  name: string;
}

type PatchCategoryFnArgs = {
  id: number;
  name: string;
};

/**
 * Patch request for subcategories api route
 * @param id The subcategory resource id
 * @param name the new subcategory name
 * @returns the id, parent category id and the new name of the sub category
 */
export const patchSubcategory = async ({
  id,
  name,
}: PatchCategoryFnArgs): Promise<PatchSubcategorySuccessResponse> => {
  const patchedData: PatchSubcategorySuccessResponse = await ky
    .patch(`/api/subcategories/${id}`, {
      json: { name },
    })
    .json();
  return patchedData;
};

type UsePatchSubcategoryOptions = UseMutationOptions<
  PatchSubcategorySuccessResponse,
  HTTPError,
  PatchCategoryFnArgs,
  unknown
>;

export const usePatchSubcategory = (options: UsePatchSubcategoryOptions) => {
  return useMutation({
    mutationFn: patchSubcategory,
    ...options,
  });
};
