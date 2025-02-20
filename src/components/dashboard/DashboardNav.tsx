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
import { useStore } from "@/store";
import { BiArrowFromRight } from "react-icons/bi";

type LinkType = {
  name: string;
  href: string;
  Icon: React.ReactNode;
  selfEnd?: boolean;
};

export default function DashboardNav() {
  const pathName = usePathname();

  const { isDashboardNavMinimized: isMinimized, setIsDashboardNavMinimized } =
    useStore();

  const toggleIsMinimized = () => {
    setIsDashboardNavMinimized(!isMinimized);
  };

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
      href: "../settings/ui",
      Icon: <IoSettingsOutline />,
      selfEnd: true,
    },
  ];

  const LinkList = links.map(({ href, name, Icon, selfEnd }) => (
    // old dark link: dark:bg-[#22233f] dark:hover:bg-[#2f325f] dark:focus:bg-[#070714]
    <Link
      title={name}
      className={clsx(
        "flex h-12 items-center gap-4 rounded-lg text-sm font-semibold text-neutral-50 transition-colors first-letter:capitalize dark:text-neutral-200 [&>svg]:h-6 [&>svg]:w-6",
        pathName === `/dashboard/${href}`
          ? "bg-red-800 dark:bg-black/50"
          : "bg-[#EC2A2A] hover:bg-[#ff4545] focus:bg-[#da2020] dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-900/50",
        {
          "mb-2 mt-auto": !!selfEnd,
          "w-12 justify-center": isMinimized,
          "w-full pl-5": !isMinimized,
        },
      )}
      key={href}
      href={`/dashboard/${href}`}
    >
      {Icon} <span className={isMinimized ? "hidden" : ""}>{name}</span>
    </Link>
  ));
  return (
    <div
      id="dashboard-nav"
      // dark:bg-[#0b0c1f]
      className={clsx(
        "flex h-full flex-col justify-between bg-primary-darker py-2 dark:bg-neutral-950",
        {
          "w-16 min-w-[4rem] px-2": isMinimized,
          "min-w-[280px] px-5": !isMinimized,
        },
      )}
    >
      <section
        className={clsx("flex grow flex-col", {
          "items-center": isMinimized,
        })}
      >
        <div
          className={clsx("flex w-full items-center justify-between", {
            "flex-col gap-2": isMinimized,
          })}
        >
          <Link
            id="nav-logo"
            className="relative flex h-10 w-10 flex-col items-center self-start"
            href="./"
          >
            <Image
              className="relative"
              src="/trb-logo-wh.png"
              alt="TRB Eshop Logo"
              fill
              priority
            />
          </Link>
          <button
            type="button"
            id="minimize-dashboard-nav"
            onClick={toggleIsMinimized}
            className="rounded-md p-1 hover:bg-red-500 dark:hover:bg-neutral-900"
          >
            <BiArrowFromRight
              className={clsx(
                "h-6 w-6 text-neutral-100 dark:text-neutral-400",
                {
                  "rotate-180": isMinimized,
                },
              )}
            />
          </button>
        </div>
        <nav
          id="nav-links"
          className={clsx("flex w-full grow flex-col gap-3", {
            "items-center pt-2": isMinimized,
            "pt-8": !isMinimized,
          })}
        >
          {LinkList}
        </nav>
      </section>
      <p
        id="nav-legal"
        className={clsx(
          "w-full text-center text-sm text-[#ffc0c0] dark:text-neutral-600",
          isMinimized ? "hidden" : "",
        )}
      >
        Copyright © {new Date().getFullYear()} TRB Eshop
      </p>
    </div>
  );
}
