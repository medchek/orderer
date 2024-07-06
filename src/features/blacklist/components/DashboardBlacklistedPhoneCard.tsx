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
    <div className="flex h-28 justify-between rounded-lg bg-neutral-950 p-4">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{phone.phone}</p>
        <div className="text-sm">
          <p className="text-stone-600">Raison</p>
          <p className="text-stone-400">
            {phone.blacklistReason?.length
              ? phone.blacklistReason
              : "Non spécifiée."}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="h-9 w-9 rounded-md bg-neutral-900 transition-colors hover:bg-neutral-800"
        onClick={() => setBlacklistedNumberIdToDelete(phone.id)}
      >
        <MdDeleteOutline className="h-6 w-6 text-neutral-500" />
      </button>
    </div>
  );
}
