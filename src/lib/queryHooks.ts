import { useQuery } from "@tanstack/react-query";
import { fetchWilayaQueryKey } from "./queryKeys";
import { getWilayas } from "./clientApiHelpers";
import { Wilaya } from "@/store/wilayaSlice";

export const useWilayasQuery = (opt?: {onSuccess: (data: Wilaya[]) => void}) => {
  return useQuery({
    queryKey: fetchWilayaQueryKey,
    queryFn: getWilayas,
    onSuccess: opt?.onSuccess,
    cacheTime: 1000 * 60 * 10,
  });
};
