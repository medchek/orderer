import ky from "ky";
import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/types/api";
import { ShippingLocationsSubmitData } from "../types";

export type PatchLocationPayload = Partial<ShippingLocationsSubmitData>;

export type PatchProductSuccessResponse = "ok";

/**
 * Patch request to update shipping location data
 * @param locationId the shipping location id
 * @param data the patch data
 */
const patchLocation = async (
  locationId: string,
  data: PatchLocationPayload,
): Promise<PatchProductSuccessResponse> => {
  return await ky
    .patch(`/api/locations/${locationId}`, {
      json: data,
    })
    .json();
};

type UsePatchLocationOptions = MutationOptions<
  PatchProductSuccessResponse,
  { id: string; data: PatchLocationPayload }
>;

export const usePatchLocation = (opts?: UsePatchLocationOptions) => {
  return useMutation({
    mutationFn: ({ id, data }) => patchLocation(id, data),
    ...opts,
  });
};
