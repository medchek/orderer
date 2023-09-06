import { Status } from "@prisma/client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky from "ky";

export interface PatchOrderRequestPayload {
  status: Status;
}

type PatchOrderSuccessResponse = {
  code: string;
  status: Status;
};

/**
 * Patch an order, modifying the order status.
 * @param code the order code
 * @param status the order status
 */
export const patchOrder = async (data: {
  code: string;
  status: Status;
}): Promise<PatchOrderSuccessResponse> => {
  const body: PatchOrderRequestPayload = { status: data.status };
  await ky
    .patch(`/api/orders/${data.code}`, {
      json: body,
    })
    .json();
  return data;
};

export const usePatchOrder = (
  config?: UseMutationOptions<
    PatchOrderSuccessResponse,
    unknown,
    PatchOrderSuccessResponse,
    unknown
  >
) => {
  return useMutation({
    mutationFn: patchOrder,
    ...config,
  });
};
