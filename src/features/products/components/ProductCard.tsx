import { ReactNode } from "react";
import ProductCardDropdown from "./ProductCardDropdown";
import ImageCarousel from "@/features/images/components/ImageCarousel";

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
  /** Controls the display of copy sharing link button */
  isDashboard?: boolean;
  code: string;
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
  code,
  isDashboard,
  children,
}: Props) {
  const priceWidthDiscount =
    discount === 0 ? price : price - (price * discount) / 100;

  // const displayImage = images.map((img) => {
  //   return getImageDirectUrl(img.id);
  // });

  return (
    <div className="relative flex h-[460px] w-auto flex-col overflow-hidden rounded-lg bg-neutral-50 transition-all hover:shadow-xl dark:bg-neutral-950">
      {/* <div
        className="pointer-events-none relative aspect-square h-[210px] max-h-[210px] w-full bg-neutral-200  dark:bg-neutral-800"
        aria-description="product-images-display"
      >
        <Image
          src={displayImage[0]}
          className="h-full w-full object-cover object-center"
          alt="Product image"
          loading="lazy"
          referrerPolicy="no-referrer"ss
          fill
          unoptimized
        /> */}

      <ImageCarousel imageIds={images} discount={discount} />
      {/* discount */}
      {/* {discount > 0 && (
          <span className="absolute bottom-2 right-3 flex h-6 w-16 items-center justify-center rounded-sm bg-secondary font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div> */}
      {/* text */}
      <section className="flex grow flex-col justify-between p-2 text-neutral-900 dark:text-neutral-50">
        <div className="flex grow flex-col justify-between overflow-hidden pb-2">
          <section className="flex flex-col gap-2">
            {/* previous height h-12 and gap-1*/}
            <div className="flex justify-between">
              <p className="line-clamp-2 h-7 font-semibold" title={name}>
                {name}
              </p>
              {isDashboard && <ProductCardDropdown productCode={code} />}
            </div>

            <div
              className="line-clamp-1 flex w-fit items-center overflow-ellipsis whitespace-nowrap rounded-md bg-neutral-200 text-sm text-neutral-500 dark:bg-neutral-900"
              title="Catégorie"
            >
              <p className="px-1 py-0.5 first-letter:capitalize">
                {category ?? "Non catégorisé"}
                {subcategory && ` / ${subcategory}`}
              </p>
            </div>

            <div
              className="line-clamp-3 text-sm text-neutral-500"
              title={description ?? ""}
            >
              {description}
            </div>
          </section>

          <section className="space-y-0.5 text-sm">
            {stock && stock > 0 && (
              <p className=" text-secondary">Stock: {stock}</p>
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
