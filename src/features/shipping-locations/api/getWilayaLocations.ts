import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import ky from "ky";

export type ShippingLocationsQueryFilter = {
  currentPage: number;

  wilaya?: number;
  town?: number;
  name?: string;
  hasCoordinates?: "1" | "0" | "";
};

export type GetWilayaShippingLocationsSuccessResponse = {
  id: string;
  name: string;
  additionalCosts: number | null;
  wilaya: {
    code: number;
    name: string;
    arName: string;
  };
  town: {
    code: number;
    name: string;
    arName: string;
  };
}[];

/**
 * Fetch all wilaya-specific shipping locations from the api
 * @returns an array of all the shipping locations related to the wilaya with the provided code
 */
const getWilayaLocations = async (
  wilayaCode: number,
): Promise<GetWilayaShippingLocationsSuccessResponse> => {
  return await ky.get(`/api/shipping-locations/${wilayaCode}`).json();
};

type UseGetWilayaLocationsOptions =
  UseQueryOptions<GetWilayaShippingLocationsSuccessResponse>;

/**
 * Query to get wilaya-specific shipping locations
 * @param wilayaCode the target wilaya
 * @param opt query options
 */
export const useGetWilayaLocations = (
  wilayaCode: number,
  opt?: UseGetWilayaLocationsOptions,
) => {
  return useQuery({
    queryKey: queryKeys.locations.wilayaSpecific(wilayaCode).queryKey,
    queryFn: () => getWilayaLocations(wilayaCode),
    ...opt,
  });
};
