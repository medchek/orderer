import ky from "ky";
import { PostProductSuccessResponse } from "./postProduct";
import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/types/api";

export interface PatchProductBodyPayload {
  name?: string;
  price?: number;
  description?: string;
  stock?: number | null;
  category?: { categoryId: number; subcategoryId?: number } | null;
  discount?: number;
  images?: {
    added: string[];
    removed: string[];
  };
}
export interface PatchProductSuccessResponse
  extends PostProductSuccessResponse {}

/**
 * Patch request to update product data
 * @param productCode the product code
 * @param data the patch data
 * @returns complete patched product data
 */
export const patchProduct = async (
  productCode: string,
  data: PatchProductBodyPayload,
): Promise<PatchProductSuccessResponse> => {
  return await ky
    .patch(`/api/products/${productCode}`, {
      json: data,
    })
    .json();
};

type UsePatchProductOptions = MutationOptions<
  PatchProductSuccessResponse,
  { code: string; data: PatchProductBodyPayload }
>;

export const usePatchProduct = (opts?: UsePatchProductOptions) => {
  return useMutation({
    mutationFn: ({ code, data }) => patchProduct(code, data),
    ...opts,
  });
};
