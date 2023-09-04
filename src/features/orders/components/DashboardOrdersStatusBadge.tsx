import Loader from "@/components/Loader";
import { Status } from "@prisma/client";
import clsx from "clsx";
import React from "react";

interface Props {
  status: Status;
  isLoading?: boolean;
}

export default function DashboardOrdersStatusBadge({
  status,
  isLoading,
}: Props) {
  const badgeText = () => {
    switch (status) {
      case "UNCONFIRMED":
        return "Non confirmée";
      case "CONFIRMED":
        return "Confirmée";
      case "SHIPPING":
        return "En livraison";
      case "SUCCESS":
        return "Complétée";
      case "CANCELED":
        return "Annulée";
      case "RETURNED":
        return "Retour";
    }
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-center px-2 h-7 text-sm bg-neutral-900 rounded-md gap-2",
        {
          "text-neutral-400": status === Status.UNCONFIRMED,
          "text-blue-500": status === Status.CONFIRMED,
          "text-teal-400": status === Status.SHIPPING,
          "text-emerald-500": status === Status.SUCCESS,
          "text-red-500": status === Status.CANCELED,
          "text-rose-700": status === Status.RETURNED,
        }
      )}
    >
      {badgeText()}
      {isLoading && <Loader className="w-4 h-4 border-neutral-600" />}
    </div>
  );
}
