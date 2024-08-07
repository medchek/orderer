import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { BlacklistedPhoneData } from "../types";
import { QueryOptions } from "@/types/api";

export type GetBlacklistSuccessResponse = BlacklistedPhoneData[];

export const getBlacklist = async (): Promise<GetBlacklistSuccessResponse> => {
  return await ky.get("/api/blacklist").json();
};

type UseFetchBlacklistOptions = QueryOptions<GetBlacklistSuccessResponse>;

export const useFetchBlacklist = (config?: UseFetchBlacklistOptions) => {
  return useQuery({
    queryKey: queryKeys.blacklist.all.queryKey,
    queryFn: getBlacklist,
    ...config,
  });
};
