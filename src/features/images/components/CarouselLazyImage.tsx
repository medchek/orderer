import { useCallback, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

interface Props {
  imgSrc: string;
  inView: boolean;
}

export default function CarouselLazyImage({ imgSrc, inView }: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <div
      className={`relative flex h-full items-center justify-center ${
        hasLoaded ? "opacity-100" : ""
      }`}
    >
      {!hasLoaded && <Loader className="h-7 w-7" />}
      <Image
        unoptimized
        className={`block object-cover object-center transition-opacity ${
          !hasLoaded ? "opacity-0" : "opacity-100"
        }`}
        onLoad={setLoaded}
        loading="lazy"
        referrerPolicy="no-referrer"
        fill
        src={
          inView
            ? imgSrc
            : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        }
        alt="Product Image"
        data-src={imgSrc}
      />
    </div>
  );
}
