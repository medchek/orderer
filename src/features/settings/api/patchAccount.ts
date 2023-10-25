import ky from "ky";
import { MutationOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export type PatchAccountPayload = {
  phone?: string;
  wilaya?: number;
  town?: number;
  fullName?: string;
  address?: string;
};

const patchAccount = async (data: PatchAccountPayload): Promise<void> => {
  await ky
    .patch("/api/accounts", {
      json: data,
    })
    .json();
};

type UsePatchAccountOptions = MutationOptions<void, PatchAccountPayload>;

export const usePatchAccount = (opts?: UsePatchAccountOptions) => {
  return useMutation({
    mutationFn: patchAccount,
    ...opts,
  });
};
