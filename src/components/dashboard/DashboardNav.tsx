"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsListNested, BsPersonSlash } from "react-icons/bs";
import { TbBox, TbCategory2 } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

type LinkType = {
  name: string;
  href: string;
  Icon: React.ReactNode;
  selfEnd?: boolean;
};

export default function DashboardNav() {
  const pathName = usePathname();
  const links: LinkType[] = [
    { name: "Produits", href: "products", Icon: <TbBox /> },
    { name: "Categories", href: "categories", Icon: <TbCategory2 /> },
    { name: "Commandes", href: "orders", Icon: <BsListNested /> },
    {
      name: "Prix de livraisons",
      href: "shipping-prices",
      Icon: <LiaShippingFastSolid />,
    },
    {
      name: "Points de livraisons",
      href: "shipping-locations",
      Icon: <MdOutlineLocationOn />,
    },
    { name: "Liste noire", href: "blacklist", Icon: <BsPersonSlash /> },
    {
      name: "Paramètres",
      href: "settings",
      Icon: <IoSettingsOutline />,
      selfEnd: true,
    },
  ];

  const LinkList = links.map(({ href, name, Icon, selfEnd }) => (
    // old dark link: dark:bg-[#22233f] dark:hover:bg-[#2f325f] dark:focus:bg-[#070714]
    <Link
      className={clsx(
        "flex h-12 w-full items-center gap-4 rounded-lg  pl-5  text-sm font-semibold transition-colors first-letter:capitalize dark:text-stone-200 [&>svg]:h-6 [&>svg]:w-6",
        pathName === `/dashboard/${href}`
          ? "dark:bg-black/50"
          : "bg-[#EC2A2A] hover:bg-[#ff4545] focus:bg-[#da2020] dark:bg-stone-900 dark:hover:bg-stone-800 focus:dark:bg-stone-900/50 ",
        {
          "self-end mt-auto mb-2": !!selfEnd,
        },
      )}
      key={href}
      href={`/dashboard/${href}`}
    >
      {Icon} <span>{name}</span>
    </Link>
  ));
  return (
    <div
      id="dashboard-nav"
      // dark:bg-[#0b0c1f]
      className="flex h-full min-w-[280px] flex-col justify-between bg-primary-darker px-5 py-2 dark:bg-stone-950 "
    >
      <section className="flex grow  flex-col">
        <div
          id="nav-logo"
          className="relative flex h-10 w-10 flex-col items-center"
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
        className="w-full text-center text-sm text-[#ffc0c0] dark:text-stone-600"
      >
        Copyright © {new Date().getFullYear()} TRB Eshop
      </p>
    </div>
  );
}
