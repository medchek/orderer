"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Product } from "../types";
import { useStore } from "@/store";
import Button from "@/components/Button";
import { useSelectedProductsCount } from "../hooks/useSelectedProductsCount";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product;
  isSelected: boolean;
}

export default function ProductCardButton({
  className,
  isSelected,
  ...props
}: Props) {
  const { addSelectedProduct, removeSelectedProduct } = useStore();
  const selectedProductCount = useSelectedProductsCount();
  return (
    <Button
      className={cn(
        "flex h-7 w-full items-center justify-center rounded-md text-sm font-semibold transition-colors active:text-white dark:text-neutral-50 lg:h-8 lg:text-base",
        {
          "bg-gray-500 hover:bg-gray-400 active:bg-gray-600": isSelected,
          "bg-secondary hover:bg-blue-400 active:bg-blue-600 dark:hover:bg-neutral-700/80 dark:active:bg-neutral-900":
            !isSelected,
        },
        className,
      )}
      {...props}
      onClick={() => {
        if (!isSelected) {
          addSelectedProduct(props.product);
        } else {
          removeSelectedProduct(props.product.code);
        }
      }}
      disabled={selectedProductCount === 3 && !isSelected}
    >
      <span className="text-sm font-semibold">
        {!isSelected ? "Ajouter" : "Retirer"}
      </span>
    </Button>
  );
}
