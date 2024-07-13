import { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export default function useImageCarousel(options?: EmblaOptionsType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
  });
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);

  useEffect(() => {}, [slidesInView, selectedImgIndex]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),

    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
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

  return {
    canScrollNext: !!emblaApi?.canScrollNext(),
    canScrollPrev: !!emblaApi?.canScrollPrev(),
    scrollNext,
    scrollPrev,
    emblaRef,
    slidesInView,
    selectedImgIndex,
    scrollTo,
  };
}
