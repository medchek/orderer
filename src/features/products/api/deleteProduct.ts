import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

/**
 * Delete a product by code
 * @param productCode the product code
 * @returns the delete product code
 */
export const deleteProduct = async (productCode: string): Promise<string> => {
  await ky.delete(`/api/products/${productCode}`).json();
  return productCode;
};

type ProductCode = string;

type UseDeleteProductOptions = Omit<
  UseMutationOptions<ProductCode, HTTPError, ProductCode, unknown>,
  "mutationFn"
>;

export const useDeleteProduct = (opts?: UseDeleteProductOptions) => {
  return useMutation({
    mutationFn: deleteProduct,
    ...opts,
  });
};
