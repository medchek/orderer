import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsListNested, BsPersonSlash } from "react-icons/bs";
import { TbBox, TbCategory2 } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";

type LinkType = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {};

export default function DashboardNav({}: Props) {
  const links: LinkType[] = [
    { name: "Produits", href: "", icon: <TbBox /> },
    { name: "Categories", href: "categories", icon: <TbCategory2 /> },
    { name: "Commandes", href: "orders", icon: <BsListNested /> },
    {
      name: "Prix de livraisons",
      href: "shipping-prices",
      icon: <LiaShippingFastSolid />,
    },
    { name: "Liste noire", href: "blacklist", icon: <BsPersonSlash /> },
  ];

  const LinkList = links.map(({ href, name, icon }) => (
    <Link
      className="flex h-12 w-full items-center text-sm rounded-lg bg-[#EC2A2A] pl-5  font-semibold text-white transition-colors first-letter:capitalize hover:bg-[#ff4545] focus:bg-[#da2020] dark:bg-[#22233f] dark:hover:bg-[#2f325f] dark:focus:bg-[#070714] [&>svg]:w-6 [&>svg]:h-6 gap-4"
      key={href}
      href={`/dashboard/${href}`}
    >
      {icon} <span>{name}</span>
    </Link>
  ));
  return (
    <div
      id="dashboard-nav"
      // dark:bg-[#0b0c1f]
      className="flex h-full min-w-[280px] flex-col justify-between bg-primary-darker px-5 py-2 dark:bg-card-dark "
    >
      <section className="flex grow  flex-col">
        <div
          id="nav-logo"
          className="relative flex w-10 h-10 flex-col items-center"
        >
          <Image
            className="relative"
            src="/trb-logo-wh.png"
            alt="TRB Eshop Logo"
            fill
            priority
          />
          {/* <p className="text-center text-sm font-semibold text-white">E-Shop</p> */}
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
