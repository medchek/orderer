import { queryKeys } from "@/lib/queryKeys";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { BlacklistedUserData } from "../types";

export type GetBlacklistSuccessResponse = BlacklistedUserData[];

export const getBlacklist = async (): Promise<GetBlacklistSuccessResponse> => {
  return await ky.get("/api/blacklist").json();
};

type UseFetchBlacklistOptions = UseQueryOptions<GetBlacklistSuccessResponse>;

export const useFetchBlacklist = (config?: UseFetchBlacklistOptions) => {
  return useQuery({
    queryKey: queryKeys.blacklist.all.queryKey,
    queryFn: getBlacklist,
    ...config,
  });
};
