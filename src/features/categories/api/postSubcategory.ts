import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

export interface PostSubCategoryRequestPayload {
  categoryId: number;
  name: string;
}

export interface PostSubCategorySuccessResponse
  extends PostSubCategoryRequestPayload {
  id: number;
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
