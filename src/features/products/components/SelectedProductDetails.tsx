"use client";
import { getImageDirectUrl } from "@/lib/utils";
import React from "react";
import { MdClear } from "react-icons/md";
import { clsx } from "clsx";
import Image from "next/image";
interface Props {
  name: string;
  description: string | null;
  price: number;
  images: { id: string }[];
  discount: number;
  code: string;
  quantity: number;
  /** Event triggered when user wants to remove the product from the order. If not provided the remove button will be omitted */
  onClear?: () => void;

  disabledRemove?: boolean;

  transparentBg?: boolean;

  small?: boolean;
}

/**
 * Component to display a single selected product data. Includes a button to
 * remove the product from the selected list
 */
export default function SelectedProductDetails({
  name,
  description,
  price,
  quantity,
  // productCount,
  images,
  discount,
  disabledRemove,
  transparentBg,
  small,
  onClear,
}: Props) {
  const discountedPrice =
    discount === 0 ? price : price - (price * discount) / 100;

  const productImageUrl = getImageDirectUrl(images[0].id);
  // old dark bg #121212
  return (
    <div
      className={clsx(
        {
          "bg-transparent": transparentBg,
          "rounded-2xl bg-neutral-200 dark:bg-neutral-900": !transparentBg,
          "h-[154px] gap-3": !small,
          "h-[130px] gap-4": small,
        },
        "relative flex w-full items-center px-3 py-2",
      )}
    >
      {/* Clear cross */}
      {!disabledRemove && onClear !== undefined && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-1 top-3 flex h-7 w-7 items-center justify-center rounded-md transition-colors focus:bg-neutral-300 dark:focus:bg-neutral-800"
          title="Supprimer de la commande"
        >
          <MdClear className="h-5 w-5 dark:text-neutral-100" />
        </button>
      )}
      {/* IMAGE */}
      <div
        className={clsx(
          small ? "size-28 min-h-28 min-w-28" : "size-32 min-h-32 min-w-32",
          "relative flex",
        )}
      >
        <Image
          className="relative h-full w-full rounded-xl object-cover"
          src={productImageUrl}
          alt={name}
          loading="lazy"
          referrerPolicy="no-referrer"
          unoptimized
          fill
        />
        {/* discount */}
        {discount > 0 && (
          <p className="absolute bottom-2 right-2 flex h-6 w-10 items-center justify-center rounded-md bg-secondary text-sm font-semibold text-white">
            -{discount}%
          </p>
        )}
      </div>
      <div
        className={clsx(
          small ? "h-28 max-h-28" : "h-32 max-h-32",
          "flex w-full grow-0 flex-col justify-between overflow-hidden",
        )}
      >
        <div className="space-y-0.5">
          <p
            className={clsx(
              "line-clamp-2 text-sm font-semibold dark:text-neutral-50 lg:text-base",
            )}
          >
            {name}
          </p>
          {/* DESCRIPTION */}
          <p
            className={clsx(
              small && "lg:text-sm",
              "line-clamp-1 text-xs text-neutral-600",
            )}
          >
            {description}
          </p>
          {/* <p className="text-secondary text-sm font-semibold">En stock: 3</p> */}
        </div>
        {/* QUANTITY AND PRICE */}
        <div className="flex w-full flex-col gap-1">
          <p
            className={clsx(
              small ? "text-sm" : "text-sm xl:text-base",
              "text-[#171717] dark:text-neutral-50",
            )}
          >
            Quantité: {quantity}
          </p>
          <p
            className={clsx(
              small ? "text-sm" : "text-sm xl:text-base",
              "line-clamp-1 font-semibold text-[#171717] dark:text-neutral-50",
            )}
          >
            Prix: {discountedPrice}DA
            {discount > 0 && (
              <span className="pl-2 font-normal dark:text-neutral-600">
                &bull; (<span className="line-through">{price}DA</span>)
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
