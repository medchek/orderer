import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

export interface PostOrderRequestPayload {
  phone: string;
  name?: string;
  lastName?: string;
  email?: string;
  address?: string;
  isHome: boolean;
  wilayaId: number;
  townCode: number;
  productsCode: string[];
}
export interface PostOrderSuccessResponse {
  orderCode: string;
}

/**
 * post request to save an order
 * @param order
 * @returns returns the order id
 */
export const postOrder = async (
  order: PostOrderRequestPayload,
): Promise<PostOrderSuccessResponse> => {
  const orderId: PostOrderSuccessResponse = await ky
    .post(`/api/orders`, {
      json: order,
    })
    .json();
  return orderId;
};

type UsePostOrderOptions = MutationOptions<
  PostOrderSuccessResponse,
  PostOrderRequestPayload
>;


export const usePostOrder = (opts?: UsePostOrderOptions) => {
  return useMutation({
    mutationFn: postOrder,
    ...opts,
  });
};
