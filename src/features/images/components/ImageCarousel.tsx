import { Product } from "@/features/products/types";
import { getImageDirectUrl } from "@/lib/utils";
import { type MouseEvent, useRef } from "react";
import CarouselLazyImage from "./CarouselLazyImage";
import clsx from "clsx";
import { FiCheck } from "react-icons/fi";
import { useStore } from "@/store";
import useImageCarousel from "../hooks/useImageCarousel";

type Props = {
  imageIds: Product["images"];
  className?: string;
  discount: number;
  isSelected?: boolean;
};

export default function ImageCarousel({
  imageIds,
  discount,
  isSelected,
}: Props) {
  const { setVisualizerImageIds } = useStore();

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const handleOpenImageVisualizer = (e: MouseEvent) => {
    // if the anchor is present (meaning there are multiple images)
    if (anchorRef !== null && anchorRef.current) {
      // if the user cicks on the anchor, prevent the iamge visualizer from opening to allow for image selection
      const isAnchorClicked = anchorRef.current.contains(e.target as Node);

      if (isAnchorClicked) return;
    }
    // if not just open the visualizer
    setVisualizerImageIds(imageIds);
  };

  const { emblaRef, slidesInView, selectedImgIndex, scrollTo } =
    useImageCarousel();
  return (
    <div
      className={clsx(
        "embla relative aspect-square h-[180px] max-h-[180px] w-full cursor-pointer overflow-hidden bg-neutral-300/80 dark:bg-stone-800 lg:h-[210px] lg:max-h-[210px]",
      )}
      // onClick={() => setVisualizerImageIds(imageIds)}
      onClick={handleOpenImageVisualizer}
      ref={emblaRef}
    >
      <div className="embla__container flex h-full">
        {imageIds.map(({ id }, index) => (
          <div
            className="embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-full"
            key={id}
          >
            <CarouselLazyImage
              imgSrc={getImageDirectUrl(id)}
              inView={slidesInView.indexOf(index) > -1}
            />
          </div>
        ))}
      </div>
      {imageIds.length > 1 && (
        <div
          className="pointer-events-none absolute bottom-0 flex h-5 w-full items-center justify-center"
          ref={anchorRef}
        >
          <div className="pointer-events-auto flex h-3 items-center justify-center gap-1 rounded-md bg-neutral-950 px-1">
            {imageIds.map(({ id }, i) => (
              <button
                type="button"
                onClick={() => scrollTo(i)}
                key={id}
                className={clsx(
                  "inline-block h-2 w-2 rounded-full",
                  selectedImgIndex === i ? "bg-secondary" : "bg-white",
                )}
              ></button>
            ))}
          </div>
        </div>
      )}

      {discount > 0 && (
        <span className="pointer-events-none absolute bottom-2 right-3 flex h-6 w-16 items-center justify-center rounded-sm bg-secondary font-semibold text-white">
          -{discount}%
        </span>
      )}

      {isSelected ? (
        <span className="pointer-events-none absolute right-3 top-2 flex size-8 items-center justify-center rounded-full bg-secondary text-white">
          <FiCheck
            className="size-6"
            size="3rem"
            title="Sélectionné pour livraison"
          />
        </span>
      ) : null}
    </div>
  );
}
