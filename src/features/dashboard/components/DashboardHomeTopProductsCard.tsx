import { getImageDirectUrl, trucateString } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  stock: number | null;
  price: number;
  count: number;
  imageId: string;
}

export default function DashboardHomeTopProductsCard({
  name,
  // price,
  stock,
  count,
  imageId,
}: Props) {
  return (
    <div className="row-span-1 flex h-auto items-center gap-2 rounded-lg bg-neutral-300 p-3 dark:bg-neutral-900">
      <div className="relative aspect-square h-14">
        <Image
          src={getImageDirectUrl(imageId)}
          alt="product image"
          unoptimized
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex grow items-center justify-between">
        <div className="flex flex-col">
          <p
            className="text-sm font-semibold text-neutral-800 dark:text-neutral-100"
            title={name}
          >
            {trucateString(name, 50)}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Stock: {stock ?? "0"}
          </p>
          {/* <p className="text-xs text-neutral-400">Prix: {price}DA</p> */}
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {count} Ventes
        </p>
      </div>
    </div>
  );
}
