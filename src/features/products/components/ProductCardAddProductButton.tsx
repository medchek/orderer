"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Product } from "../types";
import { useStore } from "@/store";
import Button from "@/components/Button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product;
}

export default function ProductCardAddProductButton(props: Props) {
  const { addSelectedProduct, selectedProducts } = useStore();
  return (
    <Button
      className={cn(
        "flex h-7 w-full items-center justify-center rounded-md bg-neutral-200 text-sm font-semibold transition-colors hover:bg-gray-300 focus:bg-secondary focus:text-white dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700 dark:focus:bg-neutral-900 lg:h-8 lg:text-base",
        props.className,
      )}
      {...props}
      onClick={() => addSelectedProduct(props.product)}
      disabled={selectedProducts.length === 3}
    >
      <span className="text-sm font-semibold">Ajouter</span>
    </Button>
  );
}
