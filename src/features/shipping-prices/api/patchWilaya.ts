import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky from "ky";

export interface PatchShippingPricesRequestPayload {
  homePrice?: number;
  officePrice?: number;
  availableHome?: boolean;
  availableOffice?: boolean;
  /** Wilayas code to be updated */
  wilayas: number[];
}

export const patchWilayas = async (
  data: PatchShippingPricesRequestPayload
): Promise<PatchShippingPricesRequestPayload> => {
  await ky
    .patch("/api/wilayas", {
      json: data,
    })
    .json();
  return data;
};

type UsePatchShippingPricesConfig = UseMutationOptions<
  PatchShippingPricesRequestPayload,
  unknown,
  PatchShippingPricesRequestPayload,
  unknown
>;

export const usePatchShippingPrices = (
  config?: UsePatchShippingPricesConfig
) => {
  return useMutation({
    mutationFn: patchWilayas,
    ...config,
  });
};
