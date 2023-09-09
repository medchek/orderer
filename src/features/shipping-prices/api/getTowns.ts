import ky from "ky";
import { QueryOptions } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export type GetTownsSuccessResponse = {
  name: string;
  arName: string;
  code: number;
}[];

/**
 * Fetch all the wilayas from the api
 * @returns an array of all the wilayas
 */
export const getTowns = async (
  wilayaCode: number,
): Promise<GetTownsSuccessResponse> => {
  return await ky.get(`/api/towns/${wilayaCode}`).json();
};

type UseGetTownsOptions = QueryOptions<GetTownsSuccessResponse>;

export const useGetTowns = (wilayaCode: number, opts?: UseGetTownsOptions) => {
  return useQuery({
    queryKey: queryKeys.towns.list(wilayaCode).queryKey,
    queryFn: () => getTowns(wilayaCode),
    ...opts,
  });
};
