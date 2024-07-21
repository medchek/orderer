import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BlacklistedPhoneData } from "../types";
import { useStore } from "@/store";

interface Props {
  phone: BlacklistedPhoneData;
}

export default function DashboardBlacklistedPhoneCard({ phone }: Props) {
  const { setBlacklistedNumberIdToDelete } = useStore();
  return (
    <div className="flex h-32 justify-between rounded-lg bg-neutral-200 p-4 dark:bg-neutral-950">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-neutral-950 dark:text-neutral-100">
          {phone.phone}
        </p>
        <div className="text-sm">
          <p className="text-neutral-500 dark:text-neutral-600">Raison</p>
          <p
            className="line-clamp-2 text-neutral-700 dark:text-neutral-400"
            title={phone.blacklistReason ?? ""}
          >
            {phone.blacklistReason?.length
              ? phone.blacklistReason
              : "Non spécifiée."}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="size-9 min-h-9 min-w-9 rounded-md bg-neutral-300 transition-colors hover:bg-neutral-400/70 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        onClick={() => setBlacklistedNumberIdToDelete(phone.id)}
      >
        <MdDeleteOutline className="h-6 w-6 text-neutral-600 dark:text-neutral-500" />
      </button>
    </div>
  );
}
