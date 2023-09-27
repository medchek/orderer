import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { type HTTPError } from "ky";

export interface PatchCategoryRequestPayload {
  name: string;
}

export interface PatchCategorySuccessResponse
  extends PatchCategoryRequestPayload {
  code: string;
}

/**
 * Patch request for categories api route
 * @param code The category code
 * @param name the new category name
 * @returns the code and the new name of the category
 */
export const patchCategory = async ({
  code,
  name,
}: {
  code: string;
  name: string;
}): Promise<PatchCategorySuccessResponse> => {
  const patchedData: PatchCategorySuccessResponse = await ky
    .patch(`/api/categories/${code}`, {
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
