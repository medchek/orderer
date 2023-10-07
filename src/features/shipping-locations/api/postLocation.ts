import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { ShippingLocation, ShippingLocationsSubmitData } from "../types";

export interface PostShippingLocationRequestPayload
  extends ShippingLocationsSubmitData {}

export type PostShippingLocationResponse = ShippingLocation;
/**
 * Post request to add a shipping location
 * @param data data of the location to add
 * @returns the added location data
 */
const postLocation = async (
  data: PostShippingLocationRequestPayload,
): Promise<PostShippingLocationResponse> => {
  return await ky
    .post(`/api/locations/`, {
      json: data,
    })
    .json();
};

type UsePostShippingLocationOptions = MutationOptions<
  PostShippingLocationResponse, // return type
  PostShippingLocationRequestPayload // request data types
>;
/**
 * Mutation to add a shipping location
 * @param opts mutation config
 */
export const usePostShippingLocation = (
  opts?: UsePostShippingLocationOptions,
) => {
  return useMutation({
    mutationFn: postLocation,
    ...opts,
  });
};
