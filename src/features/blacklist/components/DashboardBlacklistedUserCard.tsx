import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BlacklistedUserData } from "../types";
import { useStore } from "@/store";

interface Props {
  user: BlacklistedUserData;
}

export default function DashboardBlacklistedUserCard({ user }: Props) {
  const { setBlacklistedNumberIdToDelete } = useStore();
  return (
    <div className="bg-stone-950 rounded-lg p-4 h-28 flex justify-between">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{user.phone}</p>
        <div className="text-sm">
          <p className="text-stone-600">Raison</p>
          <p className="text-stone-400">
            {user.reason?.length ? user.reason : "Non spécifiée."}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="bg-stone-900 w-9 h-9 rounded-md transition-colors hover:bg-stone-800"
        onClick={() => setBlacklistedNumberIdToDelete(user.id)}
      >
        <MdDeleteOutline className="w-6 h-6 text-stone-500" />
      </button>
    </div>
  );
}
