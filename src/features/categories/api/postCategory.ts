import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

export interface PostCategoryRequestPayload {
  name: string;
}

export interface PostCategorySuccessReponse {
  id: number;
  name: string;
}

export const postCategory = async (
  data: PostCategoryRequestPayload
): Promise<PostCategorySuccessReponse> => {
  return await ky
    .post("/api/categories", {
      json: data,
    })
    .json();
};

type UsePostCategoryOptions = UseMutationOptions<
  PostCategorySuccessReponse,
  HTTPError,
  PostCategoryRequestPayload,
  unknown
>;

export const usePostCategory = (options: UsePostCategoryOptions) => {
  return useMutation({
    mutationFn: postCategory,
    ...options,
  });
};
