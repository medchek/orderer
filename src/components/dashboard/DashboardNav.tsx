import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function DashboardNav({}: Props) {
  const links = ["products", "orders"];

  const LinkList = links.map((link) => (
    <Link
      className="flex h-[50px] w-full items-center rounded-lg bg-[#EC2A2A] pl-5  font-semibold capitalize text-white transition-colors hover:bg-[#ff4545] focus:bg-[#da2020] dark:bg-[#22233f] dark:hover:bg-[#2f325f] dark:focus:bg-[#070714]"
      key={link}
      href={`#${link}`}
    >
      {link}
    </Link>
  ));
  return (
    <div
      id="dashboard-nav"
      // dark:bg-[#0b0c1f]
      className="flex h-full w-[335px] min-w-[335px] flex-col justify-between bg-primary-darker px-5 py-2 dark:bg-card-dark"
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
        className="w-full text-center text-[#ffc0c0] dark:text-[#646479]"
      >
        Copyright © 2023 TRB Eshop
      </p>
    </div>
  );
}
