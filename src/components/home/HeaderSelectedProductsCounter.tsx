"use client";
import { useSelectedProductsCount } from "@/features/products/hooks/useSelectedProductsCount";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export default function HeaderSelectedProductsCounter({
  className,
  ...props
}: Props) {
  const selectedProductsCount = useSelectedProductsCount();

  return selectedProductsCount > 0 ? (
    <span
      {...props}
      title="Nombre de produits sélectionnés pour livraison"
      className={cn(
        "flex size-5 items-center justify-center rounded-md bg-blue-500 font-medium text-neutral-50",
        className,
      )}
    >
      {selectedProductsCount}
    </span>
  ) : null;
}
