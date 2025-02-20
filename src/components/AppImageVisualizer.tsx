"use client";
import CarouselAnchor from "@/features/images/components/CarouselAnchor";
import CarouselLazyImage from "@/features/images/components/CarouselLazyImage";
import useImageCarousel from "@/features/images/hooks/useImageCarousel";
import { cn, getImageDirectUrl } from "@/lib/utils";
import { useStore } from "@/store";
import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const NavigationButton = ({
  rightDirection,
  onClick,
}: {
  rightDirection?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "absolute z-50 flex size-12 items-center justify-center rounded-full bg-neutral-900/40 text-neutral-200 hover:bg-neutral-700/40 active:bg-neutral-900/60 active:text-white",
        { "right-2": rightDirection, "left-2": !rightDirection },
      )}
    >
      <FiChevronLeft
        className={cn("size-8 -translate-x-0.5", {
          "translate-x-0.5 rotate-180": rightDirection,
        })}
      />
    </button>
  );
};

export default function AppImageVisualizer() {
  const { resetImageVisualizer, imageVisualizerIds } = useStore();

  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.code === "Escape") resetImageVisualizer();
    };

    document.addEventListener("keydown", handleEscPress, { capture: true });
    // clean up
    return () => {
      document.removeEventListener("keydown", handleEscPress, {
        capture: true,
      });
    };
  }, [resetImageVisualizer]);

  const {
    canScrollNext,
    canScrollPrev,
    emblaRef,
    slidesInView,
    selectedImgIndex,
    scrollTo,
    scrollNext,
    scrollPrev,
  } = useImageCarousel();

  const currentlySelectedImageUrl = imageVisualizerIds
    ? "url('https:" +
      getImageDirectUrl(imageVisualizerIds[selectedImgIndex].id) +
      "')"
    : undefined;

  const isMoreThanOneImage =
    imageVisualizerIds && imageVisualizerIds.length > 1;
  // const isFirstImage = selectedImgIndex === 0;
  // const isLastImage =
  //   imageVisualizerIds && selectedImgIndex === imageVisualizerIds.length - 1;

  return createPortal(
    <div
      id="app-global-image-visualizer"
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-500/40 backdrop-blur-md dark:bg-neutral-950/90"
    >
      <button
        onClick={resetImageVisualizer}
        id="close-visualizer-button"
        type="button"
        className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-100 transition-all hover:scale-105 hover:bg-neutral-800 active:bg-black"
      >
        <IoCloseOutline className="size-8" />
      </button>

      {isMoreThanOneImage && canScrollPrev && (
        <NavigationButton onClick={scrollPrev} />
      )}
      <div
        className={clsx(
          "embla h-3/5 w-full bg-neutral-600/50 dark:bg-neutral-900/50 lg:h-full lg:w-4/5 lg:max-w-[80%]",
          {
            // "bg-neutral-900": !currentlySelectedImageUrl,
            "overflow-hidden bg-cover bg-center bg-no-repeat":
              currentlySelectedImageUrl,
            "pointer-events-none":
              imageVisualizerIds === null || imageVisualizerIds.length <= 1,
          },
        )}
        style={
          {
            // backgroundImage: currentlySelectedImageUrl,
          }
        }
        ref={emblaRef}
      >
        <div className="embla__container flex h-full touch-pan-y touch-pinch-zoom">
          {imageVisualizerIds?.map(({ id }, index) => (
            <div
              className={
                "embla__slide flex h-full max-h-full min-w-0 shrink-0 grow-0 basis-full items-center justify-center"
              }
              key={id}
            >
              <CarouselLazyImage
                className="object-contain"
                imgSrc={getImageDirectUrl(id)}
                inView={slidesInView.indexOf(index) > -1}
              />
            </div>
          ))}
        </div>
      </div>

      <CarouselAnchor
        imageIds={imageVisualizerIds}
        currentlySelectedImageIndex={selectedImgIndex}
        scrollTo={scrollTo}
        className="bottom-4 scale-110 lg:scale-100"
      />

      {isMoreThanOneImage && canScrollNext && (
        <NavigationButton onClick={scrollNext} rightDirection />
      )}
    </div>,
    document.body,
  );
}
