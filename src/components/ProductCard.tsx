import { getImageDirectUrl } from "@/lib/utils";
import React, { Fragment, ReactNode, useState } from "react";

interface Props {
  name: string;
  price: number;
  description: string | null;
  discount: number;
  images: { id: string }[];
  stock: number | null;

  children: ReactNode;
}

export default function ProductCard({
  name,
  description,
  price,
  discount,
  images,
  stock,
  children,
}: Props) {
  const priceWidthDiscount =
    discount === 0 ? price : price - (price * discount) / 100;

  const displayImage = images.map((img) => {
    return getImageDirectUrl(img.id);
  });

  return (
    <div className="relative flex h-[460px] w-auto flex-col overflow-hidden rounded-lg bg-white transition-all hover:shadow-xl dark:bg-card-dark">
      <div className="pointer-events-none relative aspect-square h-[210px] max-h-[210px] w-full bg-stone-200  dark:bg-stone-800">
        <img
          src={displayImage[0]}
          className="h-full w-full object-cover object-center"
          alt="Product image"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* discount */}
        {discount > 0 && (
          <span className="absolute bottom-2 right-3 flex h-6 w-16 items-center justify-center rounded-sm bg-secondary font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div>
      {/* text */}
      <section className="flex grow flex-col justify-between p-2">
        <div className="flex grow flex-col justify-between pb-2">
          <section className="space-y-1">
            <p
              className="line-clamp-2 h-12 font-semibold dark:text-white"
              title={name}
            >
              {name}
            </p>
            <div
              className="line-clamp-3 text-sm text-[#979797]"
              title={description ?? ""}
            >
              {description}
            </div>
          </section>

          <section className="space-y-0.5">
            {stock && stock > 0 && (
              <p className="text-sm text-secondary">Stock: {stock}</p>
            )}
            <p className="font-semibold dark:text-white">
              Prix: {priceWidthDiscount}DA
            </p>
          </section>
        </div>

        {/* Buttons */}

        <div className="h-8 min-h-[2rem] w-full">{children}</div>
      </section>
    </div>
  );
}
