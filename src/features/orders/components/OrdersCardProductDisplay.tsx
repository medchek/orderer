import React from "react";
import { PublicOrderData } from "../types";
import { discountedPrice } from "@/lib/utils";

type Props = PublicOrderData["orderProducts"][number];

/** Component used to display a single product within the orders card */
export default function OrdersCardProductDisplay({
  product,
  discount,
  price,
  quantity,
}: Props) {
  return (
    <div className="flex h-10 w-full items-center justify-between gap-4 rounded-md bg-neutral-300 px-4 dark:bg-neutral-800 md:w-96">
      <p
        className="flex w-56 gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-800 dark:text-neutral-200"
        title={product.name}
      >
        <span>{product.name}</span>
        {quantity > 1 ? (
          <span className="font-medium text-neutral-500">x{quantity}</span>
        ) : null}
      </p>

      <p className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
        {discount > 0 && (
          <span title="Réduction" className="text-xs text-neutral-500">
            -{discount}%
          </span>
        )}
        <span>{discountedPrice(price, discount)}DA</span>
      </p>
    </div>
  );
}
