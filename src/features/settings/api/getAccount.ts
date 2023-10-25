import ky from "ky";

import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/api";
import { queryKeys } from "@/lib/queryKeys";

export type GetAccountResponse = {
  phone: string | null;
  wilaya: number | null;
  town: number | null;
  fullName: string | null;
  address: string | null;
};

const getAccount = async (): Promise<GetAccountResponse> => {
  return await ky.get("/api/accounts").json();
};

type UseGetAccountOptions = QueryOptions<GetAccountResponse>;
/**
 * Fetches the account data that belongs to the current session
 * @param opts query options
 */
export const useGetAccount = (opts?: UseGetAccountOptions) => {
  return useQuery({
    queryFn: getAccount,
    queryKey: queryKeys.account.currentSession.queryKey,
    ...opts,
  });
};
