import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { Wilaya } from "@/store/wilayaSlice";
import ky from "ky";

export type GetWilayasSuccessResponse = Wilaya[];

/**
 * Fetch all the wilayas from the api
 * @returns an array of all the wilayas
 */
export const getWilayas = async (): Promise<GetWilayasSuccessResponse> => {
  const data: Wilaya[] = await ky.get("/api/wilayas").json();
  return data;
};

type UseGetWilayasOptions = UseQueryOptions<GetWilayasSuccessResponse>;

export const useGetWilayas = (opt?: UseGetWilayasOptions) => {
  return useQuery({
    queryKey: queryKeys.wilayas.all.queryKey,
    queryFn: getWilayas,
    cacheTime: 1000 * 60 * 10,
    ...opt,
  });
};
