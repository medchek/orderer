import { Product } from "@/features/products/types";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imageIds: Product["images"] | null;
  currentlySelectedImageIndex: number;
  scrollTo: (index: number) => void;
}

const CarouselAnchor = forwardRef<HTMLDivElement, Props>(
  (
    { imageIds, currentlySelectedImageIndex, scrollTo, className, ...props },
    ref,
  ) => {
    return imageIds && imageIds.length > 1 ? (
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex h-5 w-full items-center justify-center",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="pointer-events-auto flex h-4 items-center justify-center gap-1 rounded-md bg-neutral-950 px-1">
          {imageIds.map(({ id }, i) => (
            <button
              type="button"
              onClick={() => scrollTo(i)}
              key={id}
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                currentlySelectedImageIndex === i ? "bg-secondary" : "bg-white",
              )}
            ></button>
          ))}
        </div>
      </div>
    ) : null;
  },
);

CarouselAnchor.displayName = "CarouselAnchor";

export default CarouselAnchor;
