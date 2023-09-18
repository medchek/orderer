import { MutationOptions } from "@/types/api";

import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { Product } from "../types";

export interface PostProductBodyPayload {
  name: string;
  price: number;
  description: string;
  stock: number | null;
  category: { categoryId: number; subcategoryId?: number } | null;
  discount: number;
  images: string[]; // string of image ids
}

export interface PostProductSuccessResponse extends Product {}
/**
 * Request to create a new product through post request
 * @param data the product body data
 * @returns created product data
 */
export const postProduct = async (
  data: PostProductBodyPayload,
): Promise<PostProductSuccessResponse> => {
  return await ky
    .post("/api/products", {
      json: data,
    })
    .json();
};

type UsePostProductOptions = MutationOptions<
  PostProductSuccessResponse,
  PostProductBodyPayload
>;

/**
 * Mutation to create a new product
 * @param opts mutation options
 * @returns created product data
 */
export const usePostProduct = (opts?: UsePostProductOptions) => {
  return useMutation({
    mutationFn: postProduct,
    ...opts,
  });
};
