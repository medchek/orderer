import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

export interface PatchSubcategorySuccessResponse {
  code: string;
  /** Parent category id */
  categoryCode: string;
  name: string;
}

type PatchCategoryFnArgs = {
  code: string;
  name: string;
};

/**
 * Patch request for subcategories api route
 * @param code The subcategory resource code
 * @param name the new subcategory name
 * @returns the code, parent category code and the new name of the sub category
 */
export const patchSubcategory = async ({
  code,
  name,
}: PatchCategoryFnArgs): Promise<PatchSubcategorySuccessResponse> => {
  const patchedData: PatchSubcategorySuccessResponse = await ky
    .patch(`/api/subcategories/${code}`, {
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
