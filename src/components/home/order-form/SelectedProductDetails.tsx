import { trucateString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { MdClear } from "react-icons/md";

interface Props {
  name: string;
  description: string;
  price: number;
  images: { link: string }[];
  discount: number;
  /** Checks if the user has only one product selected for shipping. */
  productCount: number;
  /** Event triggered when user wants to remove the product from the order. */
  onClear: () => void;
}

export default function SelectedProductDetails({
  name,
  description,
  price,
  productCount,
  images,
  discount,
  onClear,
}: Props) {
  const discountedPrice =
    discount === 0 ? price : price - (price * discount) / 100;
  // old dark bg #121212
  return (
    <div className="relative flex h-[154px] w-full items-center space-x-3 rounded-2xl bg-[#F4F4F4] px-3 py-2 dark:bg-card-dark">
      {productCount > 1 && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-1 top-3 flex h-6 w-6 items-center justify-center rounded-md transition-colors focus:bg-stone-300 dark:focus:bg-[#2e2e2e]"
          title="Supprimer de la commande"
        >
          <MdClear className=" h-5 w-5 dark:text-stone-100" />
        </button>
      )}

      <div className="relative flex h-32 w-32 min-w-[128px]">
        <Image
          className="relative rounded-xl object-cover"
          src={images[0].link}
          alt={name}
          fill
        />
        {/* discount */}
        {discount > 0 && (
          <p className="absolute bottom-2 right-2 flex h-6 w-10 items-center justify-center rounded-md bg-secondary text-sm font-semibold text-white">
            -{discount}%
          </p>
        )}
      </div>
      <div className="flex h-32 max-h-32 w-auto grow-0 flex-col justify-between overflow-hidden pr-4">
        <div className="space-y-0.5">
          <p className="line-clamp-2 font-semibold dark:text-white">{name}</p>
          <p className="line-clamp-2 text-sm text-[#666666]">
            {trucateString(description, 55)}
          </p>
          {/* <p className="text-secondary text-sm font-semibold">En stock: 3</p> */}
        </div>

        <p className="font-semibold text-[#171717] dark:text-white">
          Prix: {discountedPrice}DA
        </p>
      </div>
    </div>
  );
}
