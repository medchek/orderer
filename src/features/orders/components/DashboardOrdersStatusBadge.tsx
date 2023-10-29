import Loader from "@/components/Loader";
import { Status } from "@prisma/client";
import clsx from "clsx";
import React from "react";

interface Props {
  status: Status;
  isLoading?: boolean;
  /** Brighten the background color slightly to accomodate for the same bg color */
  isOnSameBgColor?: boolean;
}

export default function DashboardOrdersStatusBadge({
  status,
  isLoading,
  isOnSameBgColor,
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
        "line-clamp-1 flex h-7 items-center justify-center gap-2 whitespace-nowrap rounded-md  px-2 text-xs 2xl:text-sm",
        isOnSameBgColor
          ? "bg-neutral-200/70 dark:bg-neutral-800"
          : "bg-neutral-300 dark:bg-neutral-900",
        {
          "text-neutral-600 dark:text-neutral-400":
            status === Status.UNCONFIRMED,
          "text-blue-500": status === Status.CONFIRMED,
          "text-teal-400": status === Status.SHIPPING,
          "text-emerald-500": status === Status.SUCCESS,
          "text-red-500": status === Status.CANCELED,
          "text-rose-700": status === Status.RETURNED,
        },
      )}
    >
      {badgeText()}
      {isLoading && <Loader className="h-4 w-4 border-neutral-600" />}
    </div>
  );
}
