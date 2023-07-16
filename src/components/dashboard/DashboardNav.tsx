import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function DashboardNav({}: Props) {
  const links = [
    { name: "Produits", href: "" },
    { name: "Commandes", href: "orders" },
    { name: "Prix de livraisons", href: "shipping-prices" },
    { name: "Liste noire", href: "blacklist" },
  ];

  const LinkList = links.map(({ href, name }) => (
    <Link
      className="flex h-[50px] w-full items-center rounded-lg bg-[#EC2A2A] pl-5  font-semibold text-white transition-colors first-letter:capitalize hover:bg-[#ff4545] focus:bg-[#da2020] dark:bg-[#22233f] dark:hover:bg-[#2f325f] dark:focus:bg-[#070714]"
      key={href}
      href={`/dashboard/${href}`}
    >
      {name}
    </Link>
  ));
  return (
    <div
      id="dashboard-nav"
      // dark:bg-[#0b0c1f]
      className="flex h-full min-w-[280px] flex-col justify-between bg-primary-darker px-5 py-2 dark:bg-card-dark 2xl:min-w-[335px]"
    >
      <section className="flex grow  flex-col">
        <div id="nav-logo" className="flex w-[55px] flex-col items-center">
          <Image
            className="relative"
            src="/trb-logo-wh.png"
            alt="TRB Eshop Logo"
            width={55}
            height={55}
            priority
          />
          <p className="text-center text-sm font-semibold text-white">E-Shop</p>
        </div>
        <nav id="nav-links" className="flex w-full grow flex-col gap-3 pt-8">
          {LinkList}
        </nav>
      </section>
      <p
        id="nav-legal"
        className="w-full text-center text-sm text-[#ffc0c0] dark:text-[#646479]"
      >
        Copyright © {new Date().getFullYear()} TRB Eshop
      </p>
    </div>
  );
}
