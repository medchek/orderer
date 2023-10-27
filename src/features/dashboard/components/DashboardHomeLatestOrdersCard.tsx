import DashboardOrdersStatusBadge from "@/features/orders/components/DashboardOrdersStatusBadge";
import { trucateString } from "@/lib/utils";
import { Status } from "@prisma/client";
import clsx from "clsx";
import React from "react";

interface Props {
  phone: string;
  wilayaName: string;
  townName: string;
  status: Status;
  totalPrice: number;
  /** Array of products name */
  products: string[];
}

export default function DashboardHomeLatestOrdersCard({
  phone,
  townName,
  wilayaName,
  status,
  products,
  totalPrice,
}: Props) {
  return (
    <div className="flex h-1/4 max-h-[25%] flex-col rounded-lg bg-neutral-300 p-2 dark:bg-neutral-900">
      <div className="flex h-8 items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {phone}
          </p>
          <p className="text-xs text-neutral-500">
            {wilayaName} - <span className="capitalize">{townName}</span>
          </p>
        </div>
        <DashboardOrdersStatusBadge status={status} isOnSameBgColor />
      </div>
      {/* <p className="text-neutral-00 text-xs">20/10/2023 23:01</p> */}
      <div className="flex grow items-end justify-between text-sm text-neutral-900 dark:text-neutral-100">
        <div
          className={clsx(
            "line-clamp-1 flex h-full w-1/2 flex-col items-start justify-start overflow-hidden overflow-ellipsis whitespace-nowrap",
            products.length > 2 ? "text-xs" : "text-sm",
          )}
        >
          {}
          {products.map((productName, i) => (
            <p title={productName} key={i}>
              {trucateString(productName, 30)}
            </p>
          ))}
          {/* <p>Air Max 97 Leather</p> */}
          {/* <p>Air Max 97 Leather</p> */}
        </div>
        <p className="font-semibold">{totalPrice}DA</p>
      </div>
    </div>
  );
}
