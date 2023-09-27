import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

export interface PostSubCategoryRequestPayload {
  categoryCode: string;
  name: string;
}

export interface PostSubCategorySuccessResponse
  extends PostSubCategoryRequestPayload {
  code: string;
}

export const postSubCategory = async (
  data: PostSubCategoryRequestPayload
): Promise<PostSubCategorySuccessResponse> => {
  return await ky
    .post("/api/subcategories", {
      json: data,
    })
    .json();
};

type UsePostSubcategoryOptions = UseMutationOptions<
  PostSubCategorySuccessResponse,
  HTTPError,
  PostSubCategoryRequestPayload,
  unknown
>;

export const usePostSubcategory = (options: UsePostSubcategoryOptions) => {
  return useMutation({
    mutationFn: postSubCategory,
    ...options,
  });
};
