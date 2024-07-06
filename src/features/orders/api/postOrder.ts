import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

export interface PostOrderRequestPayload {
  phone: string;
  name?: string;
  lastName?: string;
  email?: string;
  address?: string;
  locationId?: string;
  isHome: boolean;
  wilayaCode: number;
  townCode: number;
  products: { [productCode: string]: { quantity: number } };
}

export type PostOrderFormData = {
  /** recaptcha token */
  token: string;
  data: PostOrderRequestPayload;
};

export interface PostOrderSuccessResponse {
  orderCode: string;
}

/**
 * post request to save an order
 * @param order object containing the recaptcha token the the order data
 * @returns returns the order id
 */
export const postOrder = async (
  order: PostOrderFormData,
): Promise<PostOrderSuccessResponse> => {
  const orderId: PostOrderSuccessResponse = await ky
    .post(`/api/orders`, {
      json: order.data,
      headers: {
        "X-Recaptcha-Token": order.token,
      },
    })
    .json();
  return orderId;
};

type UsePostOrderOptions = MutationOptions<
  PostOrderSuccessResponse,
  PostOrderFormData
>;

/**
 * Mutation to post a new order
 * @param token Recaptcha token
 * @param opts mutation options
 */
export const usePostOrder = (opts?: UsePostOrderOptions) => {
  return useMutation({
    mutationFn: postOrder,
    ...opts,
  });
};
