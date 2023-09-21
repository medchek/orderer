import { getImageDirectUrl } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  name: string;
  price: number;
  description: string | null;
  discount: number;
  images: { id: string }[];
  stock: number | null;
  category?: string | null;
  subcategory?: string | null;
  children: ReactNode;
}

export default function ProductCard({
  name,
  description,
  price,
  discount,
  images,
  stock,
  category,
  subcategory,
  children,
}: Props) {
  const priceWidthDiscount =
    discount === 0 ? price : price - (price * discount) / 100;

  const displayImage = images.map((img) => {
    return getImageDirectUrl(img.id);
  });

  return (
    <div className="relative flex h-[460px] w-auto flex-col overflow-hidden rounded-lg bg-white transition-all hover:shadow-xl dark:bg-stone-950">
      <div className="pointer-events-none relative aspect-square h-[210px] max-h-[210px] w-full bg-stone-200  dark:bg-stone-800">
        <Image
          src={displayImage[0]}
          className="h-full w-full object-cover object-center"
          alt="Product image"
          loading="lazy"
          referrerPolicy="no-referrer"
          fill
          unoptimized
        />
        {/* discount */}
        {discount > 0 && (
          <span className="absolute bottom-2 right-3 flex h-6 w-16 items-center justify-center rounded-sm bg-secondary font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div>
      {/* text */}
      <section className="flex grow flex-col justify-between p-2 text-stone-50">
        <div className="flex grow flex-col justify-between overflow-hidden pb-2">
          <section className="flex flex-col gap-2">
            {/* previous height h-12 and gap-1*/}
            <p className="line-clamp-2  text-sm font-semibold" title={name}>
              {name}
            </p>

            <div className="line-clamp-1 flex w-fit items-center overflow-ellipsis whitespace-nowrap rounded-md bg-stone-900 text-sm text-stone-500" title="Catégorie">
              <p className="first-letter:capitalize px-1 py-0.5">
                {category ?? "Non catégorisé"}
                {subcategory && ` / ${subcategory}`}
              </p>
            </div>

            <div
              className="line-clamp-3 text-sm text-stone-500"
              title={description ?? ""}
            >
              {description}
            </div>
          </section>

          <section className="space-y-0.5">
            {stock && stock > 0 && (
              <p className="text-sm text-secondary">Stock: {stock}</p>
            )}
            <p className="font-semibold">Prix: {priceWidthDiscount}DA</p>
          </section>
        </div>

        {/* Buttons */}

        <div className="h-8 min-h-[2rem] w-full">{children}</div>
      </section>
    </div>
  );
}
