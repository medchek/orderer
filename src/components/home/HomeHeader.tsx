"use client";
import Image from "next/image";
import React, { useRef } from "react";
import AuthProvider from "../AuthProvider";
import AccountActions from "../AccountActions";
import { useSession } from "next-auth/react";
import { IoLogInOutline } from "react-icons/io5";
import Link from "next/link";

type Props = {};

export default function HomeHeader({}: Props) {
  const { data } = useSession();

  return (
    <header className="relative mb-4 flex h-20 w-full items-center justify-end">
      <div className="absolute flex h-14 w-full items-center justify-center">
        <div className="relative h-14 w-14">
          <Image src="/trb-logo.png" alt="TRB Eshop Logo" fill priority />
        </div>
        {/* <p className="text-center text-sm font-semibold text-primary">E-Shop</p> */}
      </div>
      {data ? (
        <AccountActions className="mr-0" />
      ) : (
        <Link
          type="button"
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg text-[#535663] transition-colors dark:bg-[#101016]  dark:hover:bg-[#14151b] dark:focus:bg-[#0b0b0e]"
          href="/login"
          title="Se connecter"
        >
          <IoLogInOutline className="h-7 w-7" />
        </Link>
      )}
    </header>
  );
}
