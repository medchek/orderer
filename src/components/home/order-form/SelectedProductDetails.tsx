"use client";
import { getImageDirectUrl } from "@/lib/utils";
import React from "react";
import { MdClear } from "react-icons/md";
import { clsx } from "clsx";
import Image from "next/image";
import { useStore } from "@/store";
interface Props {
  name: string;
  description: string | null;
  price: number;
  images: { id: string }[];
  discount: number;
  code: string;
  /** Event triggered when user wants to remove the product from the order. If not provided the remove button will be omitted */
  onClear?: () => void;

  disabledRemove?: boolean;

  transparentBg?: boolean;

  small?: boolean;
}

export default function SelectedProductDetails({
  name,
  description,
  price,
  code,
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
  const { selectedProductsQuantity } = useStore();
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
          small ? "h-28 w-28 min-w-[7rem]" : "h-32 min-w-[8rem] lg:w-32",
          "relative flex",
        )}
      >
        <Image
          className="relative w-full rounded-xl object-cover"
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
          "flex h-32 max-h-32 w-full grow-0 flex-col justify-between overflow-hidden",
        )}
      >
        <div className="space-y-0.5">
          <p
            className={clsx(
              // { "text-sm": small },
              "line-clamp-2 text-sm font-semibold dark:text-neutral-50 lg:text-base",
            )}
          >
            {name}
          </p>
          {/* DESCRIPTION */}
          <p
            className={clsx(
              small ? "text-xs" : "text-xs lg:text-sm",
              "line-clamp-2 text-[#666666]",
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
              small && "text-sm",
              "text-sm text-[#171717] dark:text-neutral-50 lg:text-base",
            )}
          >
            Quantité: {selectedProductsQuantity[code]}
          </p>
          <p
            className={clsx(
              small && "text-sm",
              "text-sm font-semibold text-[#171717] dark:text-neutral-50 lg:text-base",
            )}
          >
            Prix: {discountedPrice}DA
            {discount > 0 && (
              <span className="font-normal dark:text-neutral-600">
                {" "}
                &bull; (<span className="line-through">{price}DA</span>)
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
