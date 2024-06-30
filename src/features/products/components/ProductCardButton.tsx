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
        "flex h-7 w-full items-center justify-center rounded-md bg-neutral-200 text-sm font-semibold transition-colors hover:bg-gray-300 active:bg-secondary active:text-white dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700 dark:active:bg-neutral-900 lg:h-8 lg:text-base",
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
