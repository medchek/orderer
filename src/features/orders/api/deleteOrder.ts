import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky from "ky";

/**
 * Delete an order
 * @param code the order code
 * @returns the deleted order code
 */
export const deleteOrder = async (code: string): Promise<string> => {
  await ky.delete(`/api/orders/${code}`).json();
  return code;
};

export const useDeleteOrder = (
  config?: UseMutationOptions<string, unknown, string, unknown>
) => {
  return useMutation({
    mutationFn: deleteOrder,
    ...config
  });
};


