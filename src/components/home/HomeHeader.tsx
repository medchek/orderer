"use client";
import Image from "next/image";
import React from "react";
import AccountActions from "../AccountActions";

type Props = {};

export default function HomeHeader({}: Props) {
  return (
    <header className="relative mx-10 mb-4 flex h-20 w-full items-center justify-end 2xl:mx-64">
      {/* absolute content */}
      <div
        id="header-logo"
        className="absolute left-0 right-0 flex h-14 w-full items-center justify-center"
      >
        <div className="relative h-14 w-14">
          <Image src="/trb-logo.png" alt="TRB Eshop Logo" fill priority />
        </div>
        {/* <p className="text-center text-sm font-semibold text-primary">E-Shop</p> */}
      </div>
      {/* relative content */}
      <AccountActions className="mr-0" />
    </header>
  );
}
