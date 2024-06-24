"use client";
import Image from "next/image";
import React from "react";
import AccountActions from "../AccountActions";
import Link from "next/link";
import { useStore } from "@/store";

interface Props {
  isAdmin?: boolean;
}

export default function HomeHeader({ isAdmin }: Props) {
  const { selectedProducts } = useStore();
  return (
    <header className="relative z-10 flex h-20 min-h-[5rem] w-full items-start justify-between pt-2">
      <Link className="relative h-12 w-12" href="..">
        <Image src="/trb-logo.png" alt="TRB Eshop Logo" fill priority />
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <nav className="hidden gap-4 lg:flex">
          <Link href="../" className="text-blue-500 hover:underline">
            <span className="flex items-center gap-1">
              <span>Commander</span>
              {/* Show number of selected products */}
              {selectedProducts.length > 0 ? (
                <span
                  title="Nombre de produits sélectionnés pour livraison"
                  className="flex size-5 items-center justify-center rounded-md bg-blue-500 font-medium text-neutral-50"
                >
                  {selectedProducts.length}
                </span>
              ) : null}
            </span>
          </Link>
          <Link href="../products" className="text-neutral-500 hover:underline">
            Produits
          </Link>
          <Link href="../orders" className="text-neutral-500 hover:underline">
            Vos Commandes
          </Link>
        </nav>
        <AccountActions isAdmin={isAdmin} />
      </div>
    </header>
  );
}
