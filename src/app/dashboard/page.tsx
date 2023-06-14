"use client";
import DashboardProductDisplay from "@/components/dashboard/DashboardProductDisplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

type Props = {};

export default function Dashboard({}: Props) {
  const links = ["products", "orders"];

  const handleFetchProducts = async () => {
    console.log("started fetching");
    const data = await fetch("/api/products/", {
      method: "GET",
    });

    console.log(data.json());
  };

  const LinkList = links.map((link) => (
    <Link
      className="capitalize w-full h-[50px] flex items-center pl-5 font-semibold text-white bg-[#EC2A2A] hover:bg-[#ff4545] focus:bg-[#da2020] rounded-lg transition-colors"
      key={link}
      href={`#${link}`}
    >
      {link}
    </Link>
  ));

  return (
    <main id="dashboard" className="flex w-screen h-screen">
      <div
        id="dashboard-nav"
        className="flex flex-col justify-between w-[335px] bg-primary-darker h-full px-5 py-2"
      >
        <section className="flex flex-col  grow">
          <div id="nav-logo" className="flex flex-col items-center w-[55px]">
            <Image
              className="relative"
              src="/trb-logo-wh.png"
              alt="TRB Eshop Logo"
              width={55}
              height={55}
              priority
            />
            <p className="text-white text-sm font-semibold text-center">
              E-Shop
            </p>
          </div>
          <div id="nav-links" className="flex flex-col w-full grow pt-8 gap-3">
            {LinkList}
          </div>
        </section>
        <p id="nav-legal" className="text-[#ffc0c0] text-center w-full">
          Copyright © 2023 TRB Eshop
        </p>
      </div>
      <div
        id="dashboard-content"
        className="flex flex-col px-6 py-2 grow h-full bg-[#F3F3F3]"
      >
        <div id="dashboard-title" className="h-14">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>

        {/* TOOLS */}
        <div id="dashboard-tools" className="h-14">
          <button
            type="button"
            className="flex items-center justify-center gap-1 font-semibold h-10 px-4 bg-primary rounded-md text-white"
            onClick={() => handleFetchProducts()}
          >
            <MdAdd className="h-6 w-6" /> Ajouter un Produit
          </button>
        </div>

        <section
          id="product-display"
          className="grid xl:grid-cols-4 2xl:grid-cols-6 gap-4 grow w-full"
        >
          <DashboardProductDisplay />
          <DashboardProductDisplay />
        </section>
      </div>
    </main>
  );
}
