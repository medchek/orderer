"use client";
import Image from "next/image";
import React from "react";
import AccountActions from "../AccountActions";
import Link from "next/link";

type Props = {};

export default function HomeHeader({}: Props) {
  return (
    <header className="relative flex h-20 w-full items-start justify-between pt-2">
      {/* absolute content */}
      {/* <div
        id="header-logo"
        className="absolute left-0 right-0 flex h-14 w-full items-center justify-center"
       >*/}
      <Link className="relative h-12 w-12" href=".">
        <Image src="/trb-logo.png" alt="TRB Eshop Logo" fill priority />
      </Link>
      {/* <p className="text-center text-sm font-semibold text-primary">E-Shop</p> */}
      {/* </div> */}
      {/* relative content */}
      <AccountActions className="mr-0" />
    </header>
  );
}
