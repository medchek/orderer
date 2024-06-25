"use client";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export default function HeaderSelectedProductsCounter({
  className,
  ...props
}: Props) {
  const { selectedProducts } = useStore();
  return selectedProducts.length > 0 ? (
    <span
      {...props}
      title="Nombre de produits sélectionnés pour livraison"
      className={cn(
        "flex size-5 items-center justify-center rounded-md bg-blue-500 font-medium text-neutral-50",
        className,
      )}
    >
      {selectedProducts.length}
    </span>
  ) : null;
}
