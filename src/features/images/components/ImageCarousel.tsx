import { Product } from "@/features/products/types";
import { getImageDirectUrl } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import CarouselLazyImage from "./CarouselLazyImage";
import { EmblaCarouselType } from "embla-carousel";
import clsx from "clsx";
import { FiCheck } from "react-icons/fi";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // active: imageIds.length > 1,
  });
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index: number) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  const updateSelectedImg = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedImgIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
    emblaApi.on("select", updateSelectedImg);
  }, [emblaApi, updateSlidesInView, updateSelectedImg]);

  return (
    <div
      className={clsx(
        "embla relative aspect-square h-[180px] max-h-[180px] w-full overflow-hidden bg-neutral-300/80 dark:bg-stone-800 lg:h-[210px] lg:max-h-[210px]",
        {
          "pointer-events-none": imageIds.length <= 1,
        },
      )}
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
        <div className="absolute bottom-0 flex h-5 w-full items-center justify-center">
          <div className="flex h-3 items-center justify-center gap-1 rounded-md bg-neutral-950 px-1">
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
