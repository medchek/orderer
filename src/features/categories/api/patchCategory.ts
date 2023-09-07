import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { type HTTPError } from "ky";

export interface PatchCategoryRequestPayload {
  name: string;
}

export interface PatchCategorySuccessResponse
  extends PatchCategoryRequestPayload {
  id: number;
}

/**
 * Patch request for categories api route
 * @param id The category id
 * @param name the new category name
 * @returns the id and the new name of the category
 */
export const patchCategory = async ({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<PatchCategorySuccessResponse> => {
  const patchedData: PatchCategorySuccessResponse = await ky
    .patch(`/api/categories/${id}`, {
      json: { name },
    })
    .json();
  return patchedData;
};

type UsePatchCategoryOptions = UseMutationOptions<
  PatchCategorySuccessResponse, // return type
  HTTPError, // error type
  PatchCategoryRequestPayload, // request payload type
  unknown
>;

export const usePatchCategory = (options: UsePatchCategoryOptions) => {
  return useMutation({
    mutationFn: patchCategory,
    ...options,
  });
};
