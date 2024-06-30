"use client";
import React from "react";
import { useSelectedProductsCount } from "../hooks/useSelectedProductsCount";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * A component that displays the number of the currently selected products
 */
export default function ProductsDisplaySelectedProductsCount({
  className,
}: Props) {
  const selectedProductsCount = useSelectedProductsCount();
  return (
    <p
      className={cn(
        "flex items-center justify-end pt-1 text-xs text-neutral-600 dark:text-neutral-500 lg:text-sm",
        className,
      )}
    >
      Sélectionnés {selectedProductsCount} (3 Maximum)
    </p>
  );
}
