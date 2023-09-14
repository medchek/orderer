import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

export interface PostBlacklistRequestPayload {
  phone: string;
  reason?: string;
}

type PhoneNumber = string;
/**
 * Post request to blacklist a user by phone number
 * @param data the user phone number and the reason of the ban
 * @returns the blacklisted phone number
 */
export const postBlacklist = async (
  data: PostBlacklistRequestPayload,
): Promise<PhoneNumber> => {
  await ky
    .post(`/api/blacklist/`, {
      json: data,
    })
    .json();
  return data.phone;
};

type UseBlacklistNumberOptions = MutationOptions<
  PhoneNumber, // return type
  unknown, // error type
  PostBlacklistRequestPayload // request data type
>;
/**
 * Mutation to blacklist a user by phone number
 * @param opts mutation config
 */
export const usePostBlacklist = (opts?: UseBlacklistNumberOptions) => {
  return useMutation({
    mutationFn: postBlacklist,
    ...opts,
  });
};
