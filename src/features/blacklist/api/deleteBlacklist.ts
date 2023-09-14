import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

/**
 * Post request to blacklist a user by phone number
 * @param data the user phone number and the reason of the ban
 * @returns the blacklisted phone number
 */
export const deleteBlacklist = async (id: number): Promise<void> => {
  await ky.delete(`/api/blacklist/${id}`).json();
};

type UseDleteBlacklistNumberOptions = MutationOptions<
  void, // return type
  unknown, // error type
  number, // request data type
  unknown // context
>;
/**
 * Mutation to blacklist a user by phone number
 * @param opts mutation config
 */
export const useDeleteBlacklistedNumber = (
  opts?: UseDleteBlacklistNumberOptions
) => {
  return useMutation({
    mutationFn: deleteBlacklist,
    ...opts,
  });
};
