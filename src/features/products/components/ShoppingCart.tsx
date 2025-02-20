"use client";
import HeaderSelectedProductsCounter from "@/components/home/HeaderSelectedProductsCounter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { useStore } from "@/store";
import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import SelectedProductDetails from "./SelectedProductDetails";
import { useSelectedProductsCount } from "../hooks/useSelectedProductsCount";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ShoppingCart() {
  // sheet state
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { selectedProducts, selectedProductsQuantity } = useStore();
  const selectedProductsCount = useSelectedProductsCount();

  const displaySelectedProducts = () => {
    const selectedProductsKeys: string[] = Object.keys(selectedProducts);

    if (selectedProductsCount === 0) {
      return (
        <p className="w-full text-center">
          Aucun produit n&apos;a encore été sélectionné
        </p>
      );
    } else {
      return selectedProductsKeys.map((productKey) => {
        const { code, description, images, name, price, discount } =
          selectedProducts[productKey];
        const productQuantity = selectedProductsQuantity[productKey];
        return (
          <SelectedProductDetails
            key={code}
            code={code}
            description={description}
            discount={discount}
            images={images}
            name={name}
            price={price}
            quantity={productQuantity}
            small
          />
        );
      });
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative flex size-8 items-center justify-center rounded-md active:bg-neutral-200 dark:text-neutral-100 dark:hover:text-white dark:active:bg-neutral-900">
          <FiShoppingCart className="size-6" />

          <HeaderSelectedProductsCounter className="absolute -bottom-2 -right-2" />
        </button>
      </SheetTrigger>
      <SheetContent
        autoFocus={false}
        className="flex w-[85%] flex-col rounded-l-lg border-none bg-neutral-200 px-4 py-4 dark:bg-neutral-950"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>
            <p className="text-left">Votre Commande</p>
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full w-full flex-col justify-between pt-6">
          <div className="flex grow flex-col gap-2">
            {displaySelectedProducts()}
          </div>

          <div>
            <Link
              href="../"
              onClick={() => setOpen(false)}
              className="flex h-full min-h-12 w-full items-center justify-center gap-2 rounded-md bg-secondary text-neutral-50 transition-colors hover:bg-blue-400 active:bg-blue-600"
            >
              <FiShoppingCart className="size-5" />
              {pathname.trim() !== "/" ? "Commander" : "Continuer"}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
