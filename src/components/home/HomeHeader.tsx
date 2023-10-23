import Image from "next/image";
import React from "react";
import AccountActions from "../AccountActions";
import Link from "next/link";

interface Props {
  isAdmin?: boolean;
}

export default async function HomeHeader({ isAdmin }: Props) {
  return (
    <header className="relative z-10 flex h-20 min-h-[5rem] w-full items-start justify-between pt-2">
      <Link className="relative h-12 w-12" href="..">
        <Image src="/trb-logo.png" alt="TRB Eshop Logo" fill priority />
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <nav className="flex gap-4">
          <Link href="../" className="text-blue-500 hover:underline">
            Commander
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
