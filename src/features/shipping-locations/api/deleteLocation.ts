import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

/**
 * Delete a shipping location by id
 * @param locationId the hipping location code
 */
const deleteLocation = async (locationId: string): Promise<string> => {
  return await ky.delete(`/api/locations/${locationId}`).json();
};

type LocationId = string;

type UseDeleteLocationOptions = Omit<
  MutationOptions<string, LocationId>,
  "mutationFn"
>;

export const useDeleteLocation = (opts?: UseDeleteLocationOptions) => {
  return useMutation({
    mutationFn: deleteLocation,
    ...opts,
  });
};
