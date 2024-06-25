import Image from "next/image";
import React from "react";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "ref" | "height" | "width" | "alt" | "src" | "loading" | "srcSet"
  > {
  whiteLogo?: boolean;
}

export default function AppLogo({ whiteLogo, ...props }: Props) {
  return (
    <Image
      src={whiteLogo ? "/trb-logo-wh.png" : "/trb-logo.png"}
      alt="TRB Eshop Logo"
      fill
      priority
      {...props}
    />
  );
}
