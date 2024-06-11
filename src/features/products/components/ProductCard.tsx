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
    <div className="relative flex h-[380px] w-auto flex-col overflow-hidden rounded-lg bg-neutral-50 transition-all hover:shadow-xl dark:bg-neutral-950 lg:h-[460px]">
      <ImageCarousel imageIds={images} discount={discount} />
      <section className="flex grow flex-col justify-between px-1.5 py-1 text-neutral-900  dark:text-neutral-50 lg:px-2 lg:py-2">
        <div className="flex grow flex-col justify-between overflow-hidden pb-2">
          <section className="flex flex-col gap-2">
            {/* previous height h-12 and gap-1*/}
            <div className="flex justify-between">
              <p
                className="line-clamp-2 h-9 text-sm font-semibold lg:h-7 lg:text-base"
                title={name}
              >
                {name}
              </p>
              {isDashboard && <ProductCardDropdown productCode={code} />}
            </div>

            <div
              className="line-clamp-1 flex w-fit items-center overflow-ellipsis whitespace-nowrap rounded-md bg-neutral-200 text-xs text-neutral-500 dark:bg-neutral-900 lg:text-sm"
              title="Catégorie"
            >
              <p className="px-1 py-0.5 first-letter:capitalize ">
                {category ?? "Non catégorisé"}
                {subcategory && ` / ${subcategory}`}
              </p>
            </div>

            <div
              className="line-clamp-3 text-xs text-neutral-500 lg:text-sm"
              title={description ?? ""}
            >
              {description}
            </div>
          </section>

          <section className="space-y-0.5 text-sm">
            {stock && stock > 0 && (
              <p className=" text-sm text-secondary lg:text-sm">
                Stock: {stock}
              </p>
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
