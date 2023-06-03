import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  description: string;
  price: number;
}

export default function ProductDetail({ name, description, price }: Props) {
  return (
    <div className="w-full bg-[#F4F4F4] h-[154px] rounded-2xl flex items-center py-2 px-3 space-x-3">
      <div className="flex relative min-w-[128px] w-32 h-32">
        <Image
          className="relative rounded-xl"
          src="/apple-watch.jpg"
          alt="TRB Eshop Logo"
          priority
          fill
        />
      </div>
      <div className="flex flex-col grow-0 justify-between h-32 w-auto">
        <div className="space-y-0.5">
          <p className="font-semibold ">{name}</p>
          <p className="text-[#666666] text-sm">{description}</p>
          {/* <p className="text-secondary text-sm font-semibold">En stock: 3</p> */}
        </div>

        <p className="font-semibold text-[#171717]">Prix: {price} DA</p>
      </div>
    </div>
  );
}
