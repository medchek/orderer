import { trucateString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { MdClear } from "react-icons/md";

interface Props {
  name: string;
  description: string;
  price: number;
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
  onClear,
}: Props) {
  return (
    <div className="relative w-full bg-[#F4F4F4] h-[154px] rounded-2xl flex items-center py-2 px-3 space-x-3">
      {productCount > 1 && (
        <button
          type="button"
          onClick={onClear}
          className="absolute flex items-center justify-center w-6 h-6 right-1 top-3 rounded-md transition-colors focus:bg-stone-300"
          title="Supprimer de la commande"
        >
          <MdClear className=" w-5 h-5" />
        </button>
      )}

      <div className="flex relative min-w-[128px] w-32 h-32">
        <Image
          className="relative rounded-xl"
          src="/apple-watch.jpg"
          alt="TRB Eshop Logo"
          priority
          fill
          sizes="128px"
        />
      </div>
      <div className="flex flex-col grow-0 justify-between h-32 max-h-32 w-auto pr-4 overflow-hidden">
        <div className="space-y-0.5">
          <p className="font-semibold ">{name}</p>
          <p className="text-[#666666] text-sm">
            {trucateString(description, 55)}
          </p>
          {/* <p className="text-secondary text-sm font-semibold">En stock: 3</p> */}
        </div>

        <p className="font-semibold text-[#171717]">Prix: {price} DA</p>
      </div>
    </div>
  );
}
