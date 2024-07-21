import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { Wilaya } from "@/store/wilayaSlice";
import ky from "ky";
import { QueryOptions } from "@/types/api";

export type GetWilayasSuccessResponse = Wilaya[];

/**
 * Fetch all the wilayas from the api
 * @returns an array of all the wilayas
 */
export const getWilayas = async (): Promise<GetWilayasSuccessResponse> => {
  const data: Wilaya[] = await ky.get("/api/wilayas").json();
  return data;
};

type UseGetWilayasOptions = QueryOptions<GetWilayasSuccessResponse>;

export const useGetWilayas = (opt?: UseGetWilayasOptions) => {
  return useQuery({
    queryKey: queryKeys.wilayas.all.queryKey,
    queryFn: getWilayas,
    ...opt,
  });
};
