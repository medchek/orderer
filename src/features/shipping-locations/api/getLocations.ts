import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import ky from "ky";
import { ShippingLocation } from "../types";
import { convertObjectToQueryParams } from "@/lib/utils";

export type ShippingLocationsQueryFilter = {
  currentPage: number;

  wilaya?: number;
  town?: number;
  name?: string;
  hasCoordinates?: "1" | "0" | "";
};

export type GetShippingLocationsSuccessResponse = {
  count: number;
  data: ShippingLocation[];
};

/**
 * Fetch all shipping locations from the api
 * @returns an array of all the shipping locations
 */
const getLocations = async (
  filters: ShippingLocationsQueryFilter,
): Promise<GetShippingLocationsSuccessResponse> => {
  const { currentPage, ...queryFilters } = filters;
  const filterParams = convertObjectToQueryParams(queryFilters);

  return await ky
    .get(
      `/api/locations?page=${currentPage}` +
        (filterParams ? `&${filterParams}` : ""),
    )
    .json();
};

type UseGetLocationsOptions =
  UseQueryOptions<GetShippingLocationsSuccessResponse>;

export const useGetLocations = (
  filters: ShippingLocationsQueryFilter,
  opt?: UseGetLocationsOptions,
) => {
  return useQuery({
    queryKey: queryKeys.locations.all(filters).queryKey,
    queryFn: () => getLocations(filters),
    ...opt,
  });
};
